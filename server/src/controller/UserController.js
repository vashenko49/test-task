const mongoose = require('mongoose');
const {getToken, getRefreshToken} = require('../utils/Token');
const {comparePassword} = require('../utils/PasswordUtil');
const {responseMessages} = require('../utils/ReponseTemplate');
const {catchErrorsExpressValidator, serverError} = require('../utils/ErrorHandler');
const {
  findUserByEmail,
  createUser,
  findUserById,
  pushAccountsToUser
} = require('../service/UserService');
const {
  createRefreshToken,
  deleteRefreshTokenByUserId,
  deleteRefreshTokenById,
  startRefreshTokenTransaction
} = require('../service/RefreshTokenService');
const {
  createManyAccount
} = require('../service/AccountService');
const _ = require('lodash')
const {encoderPassword} = require('../utils/PasswordUtil');
const {typeAccount} = require('../config/Options');

exports.logIn = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await mongoose.startSession();

  await session.startTransaction();
  try {
    const {email, password} = req.body;

    const user = await findUserByEmail(email)

    if (!user){
      return res.status(403)
        .json(responseMessages([ 'User not found' ]));
    }

    if (user.isBlocked){
      return res.status(403)
        .json(responseMessages([ 'User was blocked' ]));
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch){
      return res.status(403)
        .json(responseMessages([ 'Password incorrect' ]));
    }

    const token = await getToken(user._id);
    const refreshFromDb = await createRefreshToken(req.clientIp, user._id);
    const refreshToken = await getRefreshToken(refreshFromDb._id);

    await session.commitTransaction();
    return res.status(200)
      .json({
        jwt: token,
        refreshToken,
        user: _.omit({...user._doc}, 'password')
      });
  }
  catch (e){
    await session.abortTransaction();
    return res.status(500)
      .json(serverError(e));
  }
  finally {
    session.endSession();
  }
};

exports.signUp = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }
  const session = await mongoose.startSession();

  await session.startTransaction();

  try {
    const {email, password, fullName} = req.body;

    const user = await findUserByEmail(email);

    if (user && user.email.toString() === req.body.email){
      return res.status(403)
        .json(responseMessages([ 'Email is already taken' ]));
    }

    const encodedPassword = await encoderPassword(password);


    let newUser = await createUser(email, encodedPassword, fullName, session);


    const newAccountsId = (await createManyAccount(typeAccount.map((accountType) => ({
      user: newUser._id,
      accountType
    })), session))
      .map((e) => e._id)

    newUser = await pushAccountsToUser(newUser._id, newAccountsId, session);
    const token = await getToken(newUser._id);
    const refreshFromDb = await createRefreshToken(req.clientIp, newUser._id, session);

    const refreshToken = await getRefreshToken(refreshFromDb._id);


    await session.commitTransaction();
    return res.status(200)
      .json({
        jwt: token,
        refreshToken,
        user: _.omit({...newUser._doc}, 'password')
      });

  }
  catch (e){
    await session.abortTransaction();
    return res.status(500)
      .json(serverError(e));
  }
  finally {
    session.endSession();
  }
}


exports.checkEmail = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }
  try {
    const {email} = req.query;
    const user = await findUserByEmail(email)

    let status = false;

    if (!user){
      status = true;
    }

    return res.status(200)
      .json({
        email: status
      });
  }
  catch (e){
    return res.status(500)
      .json(serverError(e));
  }
};


exports.logOut = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await startRefreshTokenTransaction();

  session.startTransaction();

  try {
    const {_id} = req.user;

    await deleteRefreshTokenByUserId(_id, session);

    await session.commitTransaction();
    return res.status(200)
      .json(responseMessages([ 'Success logged out' ]));
  }
  catch (e){
    await session.abortTransaction();
    return res.status(500)
      .json(serverError(e));
  }
  finally {
    session.endSession();
  }
};


exports.getNewTokenByRefreshToken = async(req, res) => {
  const session = await startRefreshTokenTransaction();

  session.startTransaction();
  try {

    const {_id: refreshId, idUser: {_id: idUser}} = req.user;

    await deleteRefreshTokenById(refreshId, session);

    const token = await getToken(idUser);
    const refreshFromDb = await createRefreshToken(req.clientIp, idUser, session);
    const refreshToken = await getRefreshToken(refreshFromDb._id);

    const user = await findUserById(idUser);

    await session.commitTransaction();
    return res.status(200)
      .json({
        jwt: token,
        refreshToken,
        user: _.omit({...user._doc}, 'password')
      });
  }
  catch (e){
    await session.abortTransaction();
    return res.status(500)
      .json(serverError(e));
  }
  finally {
    session.endSession();
  }
};

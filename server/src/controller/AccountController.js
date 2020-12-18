const mongoose = require('mongoose');

const {responseMessages} = require('../utils/ReponseTemplate');
const {
  serverError,
  catchErrorsExpressValidator
} = require('../utils/ErrorHandler');
const {
  createAccount,
  wortOutAmountAndChangeCurrencyAccount,
  deleteAccountByNumber,
  topUpAccount,
  withDraw,
  findAccountByNumber
} = require('../service/AccountService');
const {
  pushAccountsToUser,
  pullAccountsToUser,
  findUserById
} = require('../service/UserService');
const {
  createTransaction,
  findTransactionByAccountId
} = require('../service/TransactionService');
const {exchangeRateFromToByAmount} = require('../repository/RateRepository');


exports.createAccount = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await mongoose.startSession();

  await session.startTransaction();
  try {
    const {currency: selectedCurrency, typeAccount: selectedTypeAccount} = req.body;

    const {_id} = req.user;

    const newAccount = await createAccount(_id, selectedTypeAccount, selectedCurrency, session);

    await pushAccountsToUser(_id, [ newAccount._id ], session);

    await session.commitTransaction();

    return res.status(200)
      .json(newAccount);
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


exports.deleteAccountByNumber = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await mongoose.startSession();

  await session.startTransaction();
  try {
    const {_id: userId} = req.user;
    const {number} = req.query;


    const account = await findAccountByNumber(number);

    if (!account){
      return res.status(404)
        .json(responseMessages([ 'Account not found by number ' ]));
    }

    if(!userId.equals(account.user)){
      return res.status(423)
        .json(responseMessages([ 'This is not your card' ]));
    }

    const deletedAccount = await deleteAccountByNumber(number, session);


    await pullAccountsToUser(userId, [ deletedAccount._id ], session);
    await session.commitTransaction();
    return res.status(200)
      .json(responseMessages([ 'Success remove' ]));
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

exports.topUpAccount = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const {_id: userId} = req.user;
    const {number, amount} = req.body;

    const account = await findAccountByNumber(number);

    if (!account){
      return res.status(404)
        .json(responseMessages([ 'Account not found by number ' ]));
    }

    if(!userId.equals(account.user)){
      return res.status(423)
        .json(responseMessages([ 'This is not your card' ]));
    }

    const updated = await topUpAccount(number, amount, session);

    await createTransaction(
      account._id,
      `top up ${amount}${account.currency}`,
      account.balance,
      amount,
      account.currency,
      session
    );

    await session.commitTransaction();
    return res.status(200)
      .json(updated);
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


exports.transferFromTo = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await mongoose.startSession();

  await session.startTransaction();

  try {

    const {_id: userId} = req.user;

    // eslint-disable-next-line prefer-const
    let {fromNumber, toNumber, amount} = req.body;

    let accountFrom = await findAccountByNumber(fromNumber);

    if(!userId.equals(accountFrom.user)){
      return res.status(423)
        .json(responseMessages([ 'This is not your card' ]));
    }


    const accountTo = await findAccountByNumber(toNumber);

    if (!accountFrom){
      return res.status(404)
        .json(responseMessages([ 'Account not found by number ' ]));
    }
    if (!accountTo){
      return res.status(404)
        .json(responseMessages([ 'Account receiver not found by number ' ]));
    }

    if (accountFrom.balance < amount && accountFrom.accountType === 'debit'){
      return res.status(402)
        .json(responseMessages([ 'You do not have enough money' ]));
    }

    await createTransaction(
      accountFrom._id,
      `Transfer to ${toNumber} ${amount}${accountFrom.currency}`,
      accountFrom.balance - amount,
      amount,
      accountFrom.currency,
      session
    );

    accountFrom = await withDraw(fromNumber, amount, session);

    if (accountTo.currency !== accountFrom.currency){
      amount = await exchangeRateFromToByAmount(accountFrom.currency, accountTo.currency, amount)
      amount = amount.rates[accountTo.currency]
    }

    await topUpAccount(toNumber, amount, session);


    await createTransaction(
      accountTo._id,
      `Get from ${fromNumber} ${amount}${accountTo.currency}`,
      accountTo.balance + amount,
      amount,
      accountTo.currency,
      session
    );


    await session.commitTransaction();

    const userAccount = await findUserById(userId);


    return res.status(200)
      .json(userAccount.accounts);
  }
  catch (e){
    console.log(e);
    await session.abortTransaction();
    return res.status(500)
      .json(serverError(e));
  }
  finally {
    session.endSession();
  }
}


exports.changeCurrencyAccount = async(req, res) => {
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  const session = await mongoose.startSession();

  await session.startTransaction();

  try {
    const {_id: userId} = req.user;
    const {number, currency} = req.body;

    let account = await findAccountByNumber(number);

    if(account.currency !== currency){


      if (!account){
        return res.status(404)
          .json(responseMessages([ `Account not found by number ${number}` ]));
      }
      if(!userId.equals(account.user)){
        return res.status(423)
          .json(responseMessages([ 'This is not your card' ]));
      }

      account = await wortOutAmountAndChangeCurrencyAccount(number, currency, session);
    }

    await session.commitTransaction();
    return res.status(200)
      .json(account);
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


exports.getTransactionByAccountId = async(req, res)=>{
  const error = catchErrorsExpressValidator(req);

  if (error){
    return res.status(402)
      .json(error);
  }

  try {
    const {accountId} = req.query;
    const tran = await findTransactionByAccountId(accountId);

    return res.status(200)
      .json(tran);
  }
  catch (e){
 
    return res.status(500)
      .json(serverError(e));
  }
}

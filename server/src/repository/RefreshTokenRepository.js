const RefreshToken = require('../model/RefreshToken');
const moment = require('moment');

exports.getRefreshTokenByIdAndPopulateByUser = async(id) => await RefreshToken.findById(id)
  .populate(
    'idUser'
  );

exports.createRefreshToken = async(ip, idUser, session)=>await RefreshToken.create(
  [ {
    validUntil: moment()
      .add(7, 'day'),
    ip,
    idUser
  } ], {session}
).then((res)=>res[0])

exports.deleteRefreshTokenByUserId = async(idUser)=>RefreshToken.deleteMany({idUser});
exports.deleteRefreshTokenById = async(id, session)=>RefreshToken.findByIdAndDelete(id).session(session);

exports.startRefreshTokenTransaction = async() => await RefreshToken.startSession();

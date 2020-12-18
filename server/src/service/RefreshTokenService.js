const {
  getRefreshTokenByIdAndPopulateByUser,
  createRefreshToken,
  deleteRefreshTokenByUserId,
  startRefreshTokenTransaction,
  deleteRefreshTokenById
} = require('../repository/RefreshTokenRepository');


exports.getRefreshTokenByIdAndPopulateByUser = async(id)=> await getRefreshTokenByIdAndPopulateByUser(id);
exports.createRefreshToken = async(ip, idUser, session)=>await createRefreshToken(ip, idUser, session);
exports.deleteRefreshTokenByUserId = async(id)=>await deleteRefreshTokenByUserId(id);
exports.deleteRefreshTokenById = async(id, session)=>await deleteRefreshTokenById(id, session);
exports.startRefreshTokenTransaction = async()=>await startRefreshTokenTransaction();

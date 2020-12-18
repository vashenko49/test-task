const {
  findUserById,
  findUserByEmail,
  createUser,
  startUserTransaction,
  pushAccountsToUser,
  pullAccountsToUser,
  getAllUser
} = require('../repository/UserRepository');


exports.findUserById = async(id) => await findUserById(id);
exports.findUserByEmail = async(email) => await findUserByEmail(email);
exports.createUser = async(email, password, fullName, session) => await createUser(email, password, fullName, session);
exports.pushAccountsToUser = async(userId, accountsId, session) => await pushAccountsToUser(userId, accountsId, session);
exports.startUserTransaction = async() => await startUserTransaction();
exports.getAllUser = async() => await getAllUser();
exports.pullAccountsToUser = async(userId, accountsId, session) => await pullAccountsToUser(userId, accountsId, session);

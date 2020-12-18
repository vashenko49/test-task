const {
  findTransaction,
  createTransaction
} = require('../repository/TransactionRepository')

exports.findTransactionByAccountId = async(accountId) => await findTransaction(accountId);
exports.createTransaction = async(accountId, description, balance, transactionAmount, currency, session)=>await createTransaction(accountId, description, balance, transactionAmount, currency, session);

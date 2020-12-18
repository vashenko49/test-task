const {
  findTransaction,
  createTransaction
} = require('../repository/TransactionRepository')

exports.findTransactionByAccountId = async(accountId, page, limit) => await findTransaction(accountId, page, limit);
exports.createTransaction = async(accountId, description, balance, transactionAmount, currency, session)=>await createTransaction(accountId, description, balance, transactionAmount, currency, session);

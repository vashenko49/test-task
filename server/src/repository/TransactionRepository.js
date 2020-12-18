const Transaction = require('../model/Transaction');


exports.startTransactionTr = async() => await Transaction.startSession();

exports.createTransaction = async(account, description, balance, transactionAmount, currency, session) => await Transaction(
  {account, description, balance, transactionAmount, currency}
).save({session})

exports.findTransaction = async(accountId) => await Transaction.find(
  {
    account: accountId
  })

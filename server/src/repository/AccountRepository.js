const Account = require('../model/Account');
const {currency: currencyOption} = require('../config/Options');


exports.createAccount = async(userId, accountType, currency = currencyOption[0], session) => await Account.create([
  {
    user: userId,
    accountType,
    currency
  }
],
{session}
).then((res) => res[0])

exports.deleteAccountByNumber = async(number, session) => await Account.findOneAndDelete({number}, {session});
exports.operationWithAccountByNumber = async(number, amount, session) => {
  const account = await Account.findOne({number})

  account.balance += amount;
  return await account.save({session});
}


exports.findAccountByNumber = async(number) => await Account.findOne({number});

exports.startAccountTransaction = async() => await Account.startSession();

exports.createManyAccount = async(accounts, session) => await Account.insertMany(accounts, {session});

exports.wortOutAmountAndChangeCurrencyAccount = async(number, amount, currency, session) => await Account.findOneAndUpdate({number}, {
  $set: {balance: amount, currency}
}, {
  new: true,
  session
})


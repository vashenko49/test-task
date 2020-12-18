const {
  createAccount,
  createManyAccount,
  startAccountTransaction,
  deleteAccountByNumber,
  operationWithAccountByNumber,
  findAccountByNumber,
  wortOutAmountAndChangeCurrencyAccount
} = require('../repository/AccountRepository');
const {exchangeRateFromToByAmount} = require('../repository/RateRepository');


exports.createAccount = async(userId, accountType, currency, session) => await createAccount(userId, accountType, currency, session);
exports.createManyAccount = async(data, session) => await createManyAccount(data, session);
exports.findAccountByNumber = async(number) => await findAccountByNumber(number);
exports.startAccountTransaction = async() => await startAccountTransaction();
exports.deleteAccountByNumber = async(number, session) => await deleteAccountByNumber(number, session);
exports.topUpAccount = async(number, amount, session)=> await operationWithAccountByNumber(number, Math.abs(amount), session);
exports.withDraw = async(number, amount, session)=> await operationWithAccountByNumber(number, -Math.abs(amount), session);
exports.wortOutAmountAndChangeCurrencyAccount = async(number, currencyTo, session)=>{
  const account = await findAccountByNumber(number);

  const response = await exchangeRateFromToByAmount(account.currency, currencyTo, account.balance);
  
  let newAmount = response.rates[currencyTo];

  if(account.amount < 0){
    newAmount = -newAmount;
  }


  return await wortOutAmountAndChangeCurrencyAccount(number, newAmount, currencyTo, session);
}

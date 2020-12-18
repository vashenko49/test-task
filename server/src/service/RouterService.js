const {exchangeRateFromToByAmount} = require('../repository/RateRepository');

exports.exchange = async(data) => {
  const {from, to, amount} = data;

  return await exchangeRateFromToByAmount(from, to, amount);
}

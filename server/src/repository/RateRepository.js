const axios = require('axios');
const {EXCHANGE_SERVICE} = require('../config/Rate');

exports.exchangeRateFromToByAmount = async(from, to, amount) => {
  if (from === to){
    return amount
  }
  return await axios.get(EXCHANGE_SERVICE, {
    params: {
      base: from,
      symbols: to,
      amount
    }
  })
    .then((res) => res.data);
}

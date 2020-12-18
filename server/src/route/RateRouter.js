const express = require('express');

const router = express.Router();
const {checkSchema} = require('express-validator');
const {currency} = require('../config/Options');
const {exchange} = require('../controller/RateController');


const validCurrency = {
  in: [ 'query' ],
  isEmpty: false,
  isIn: {
    options: [ currency ],
    errorMessage: 'Select correct data'
  }
}

router.get('/exchange', [
  checkSchema({
    from: validCurrency,
    to: validCurrency,
    amount: {
      in: [ 'query' ],
      errorMessage: 'Amount should be number',
      isInt: true,
      toInt: true
    }
  })
], exchange)

module.exports = router;

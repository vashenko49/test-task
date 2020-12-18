const express = require('express');

const router = express.Router();
const {checkSchema} = require('express-validator');
const passport = require('passport');

const {
  currency,
  typeAccount
} = require('../config/Options');

const {
  createAccount,
  deleteAccountByNumber,
  topUpAccount,
  transferFromTo,
  changeCurrencyAccount
} = require('../controller/AccountController');


const validCurrency = {
  in: [ 'body' ],
  isEmpty: false,
  isIn: {
    options: [ currency ],
    errorMessage: 'Select correct data'
  }
}

const validTypeAccount = {
  in: [ 'body' ],
  isEmpty: false,
  isIn: {
    options: [ typeAccount ],
    errorMessage: 'Select correct data'
  }
}


router.post('/', [
  passport.authenticate('passport', {session: false}),
  checkSchema({
    currency: validCurrency,
    typeAccount: validTypeAccount
  })
], createAccount)

router.delete('/', [
  passport.authenticate('passport', {session: false}),
  checkSchema({
    number: {
      in: [ 'query' ],
      isEmpty: false
    }
  })
], deleteAccountByNumber);

router.put('/top-up',
  [
    passport.authenticate('passport', {session: false}),
    checkSchema({
      number: {
        in: [ 'body' ],
        isEmpty: false
      },
      amount: {
        in: [ 'body' ],
        errorMessage: 'Amount should be number',
        isInt: true,
        toInt: true
      }
    })
  ],
  topUpAccount
);

router.put('/transfer',
  [
    passport.authenticate('passport', {session: false}),
    checkSchema({
      fromNumber: {
        in: [ 'body' ],
        isEmpty: false
      },
      toNumber: {
        in: [ 'body' ],
        isEmpty: false
      },
      amount: {
        in: [ 'body' ],
        errorMessage: 'Amount should be number',
        isInt: true,
        toInt: true
      }
    })
  ],
  transferFromTo)


router.put('/change-currency',
  [
    passport.authenticate('passport', {session: false}),
    checkSchema({
      currency: validCurrency,
      number: {
        in: [ 'body' ],
        isEmpty: false
      }
    })
  ],
  changeCurrencyAccount)


module.exports = router;

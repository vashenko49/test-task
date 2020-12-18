const express = require('express');
const _ = require('lodash');
const passport = require('passport');

const router = express.Router();
const {checkSchema} = require('express-validator');

const {
  logIn,
  signUp,
  logOut,
  getNewTokenByRefreshToken
} = require('../controller/UserController');

const customPassword = (isRequire) => ({
  password: {
    in: [ 'body' ],
    custom: {
      options: (value) => {
        let data = value;

        if (_.isUndefined(value)){
          data = '';
        }
        // eslint-disable-next-line
                    if (isRequire | data) {
          return data.match('^(?=.*[A-Za-z])[A-Za-z\\d]{6,}$');
        }

        if (!isRequire){
          return true;
        }
      },
      errorMessage: 'No valid password'
    }
  }
});

const checkEmail = {
  email: {
    in: [ 'body' ],
    isEmpty: false,
    isEmail: true
  }
}

router.post(
  '/log-in',
  checkSchema({
    ...checkEmail,
    ...customPassword(true)
  }),
  logIn
);

router.post(
  '/sign-up',
  checkSchema({
    ...checkEmail,
    ...customPassword(true),
    fullName: {
      in: [ 'body' ],
      isEmpty: false
    }
  }),
  signUp
);

router.get(
  '/log-out', passport.authenticate('passport', {session: false}), logOut
);

router.get(
  '/refresh-token', passport.authenticate('refresh-token', {session: false}), getNewTokenByRefreshToken
)


module.exports = router;

const {validationResult} = require('express-validator');

module.exports = {
  catchErrorsExpressValidator: (req) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
      return error.array();
    }
  },
  serverError: () => ({
    message: [
      {
        msg: 'Error: Cannot connect to server.'
      }
    ]
  })
};

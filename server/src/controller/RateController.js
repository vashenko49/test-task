const {serverError} = require('../utils/ErrorHandler');
const {catchErrorsExpressValidator} = require('../utils/ErrorHandler');
const {exchange} = require('../service/RouterService')


exports.exchange = async(req, res) => {
  try {
    const error = catchErrorsExpressValidator(req);

    if (error){
      return res.status(402)
        .json(error);
    }

    const response = await exchange(req.query);

    return res.status(200)
      .json(response);
  }
  catch (e){
    return res.status(500)
      .json(serverError(e));
  }
}

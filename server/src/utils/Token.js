const jwt = require('jsonwebtoken');

exports.getToken = async(_id) =>
  await jwt.sign(
    {
      _id
    },
    process.env.PASSPORT_SECRET,
    {expiresIn: '1h'}
  );

exports.getRefreshToken = async(refreshId) =>
  await jwt.sign({refreshId}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });

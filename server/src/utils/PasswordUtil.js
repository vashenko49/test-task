const bcrypt = require('bcryptjs');


exports.encoderPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};
exports.comparePassword = async(password, passwordCandidate) => await bcrypt.compare(password, passwordCandidate);


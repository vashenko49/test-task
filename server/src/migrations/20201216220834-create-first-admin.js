const dotenv = require('dotenv');
const PasswordUtils = require('../utils/PasswordUtil');

dotenv.config();

module.exports = {
  async up(db){
    const password = await PasswordUtils.encoderPassword(process.env.ADMIN_PASSWORD);

    await db.collection('user')
      .insertOne({
        email: process.env.ADMIN_EMAIL,
        password,
        fullName: 'Admin Admin',
        isBlocked: false,
        isAdmin: true
      });
  },

  async down(db){
    await db.collection('user')
      .deleteOne({email: process.env.ADMIN_EMAIL});
  }
};

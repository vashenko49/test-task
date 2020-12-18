const mongoose = require('mongoose');
const {currency, typeAccount} = require('../config/Options');
const generator = require('creditcard-generator')

const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const Account = new schema({
  number: {
    type: String,
    unique: true,
    default: ()=>generator.GenCC('VISA')[0]
  },
  user: {
    type: schema.Types.ObjectId,
    ref: 'user'
  },
  balance: {
    type: Number,
    default: 0
  },
  accountType: {
    type: String,
    enum: typeAccount,
    default: typeAccount[0]
  },
  currency: {
    type: String,
    enum: currency,
    default: currency[0]
  }
},
{
  timestamps: true
});

Account.plugin(mongoosePaginate);

module.exports = mongoose.model('account', Account, 'account');

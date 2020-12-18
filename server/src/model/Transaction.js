const mongoose = require('mongoose');

const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const {currency} = require('../config/Options');

const Transaction = new schema({
  account: {
    type: schema.Types.ObjectId,
    ref: 'account'
  },
  description: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
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

Transaction.plugin(mongoosePaginate);

module.exports = mongoose.model('transactionAc', Transaction, 'transactionAc');

const mongoose = require('mongoose');

const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const User = new schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator(v){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    },
    required: [ true, 'Email required' ]
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  accounts: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: true
  } ]
},
{
  timestamps: true
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('user', User, 'user');

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const RefreshToken = new schema(
  {
    validUntil: {
      type: Date,
      required: true
    },
    ip: {
      type: String,
      required: true
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {timestamps: {createdAt: 'createdAt'}}
);

module.exports = mongoose.model('refreshToken', RefreshToken, 'refreshToken');

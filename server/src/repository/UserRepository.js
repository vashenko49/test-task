const User = require('../model/User');

exports.findUserById = async(id) => await User.findById(id).populate('accounts');
exports.findUserByEmail = async(email) => await User.findOne({email}).populate('accounts');
exports.createUser = async(email, password, fullName, session) => await User.create([ {
  email, password, fullName
} ], {session}).then((res)=> res[0])

exports.startUserTransaction = async() => await User.startSession();
exports.pushAccountsToUser = async(userId, accountsId, session)=>await User.findByIdAndUpdate(userId,
  {$push:
            {accounts: {
              $each: accountsId}
            }
  },
  {
    new: true,
    session
  }
).populate('accounts');

exports.pullAccountsToUser = async(userId, accountsId, session)=>await User.findByIdAndUpdate(userId,
  {$pull:
            {accounts: {
              $each: accountsId}
            }
  },
  {
    new: true,
    session
  }
).populate('accounts')

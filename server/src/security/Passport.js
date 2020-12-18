const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const moment = require('moment');

const {getRefreshTokenByIdAndPopulateByUser} = require('../service/RefreshTokenService');
const {findUserById} = require('../service/UserService');

module.exports = async(passport) => {
  passport.use(
    'passport',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_SECRET,
        passReqToCallback: true
      },
      async(req, jwtPayload, done) => {
        try {
          const {
            _id
          } = jwtPayload;

          const user = await findUserById(_id);

          if (user.isBlocked){
            return done(null, false, 'User was blocked');
          }

          return done(null, user);
        }
        catch (e){
          return done(e, false, e.message);
        }
      }
    )
  );

  passport.use(
    'refresh-token',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('refresh-token'),
        secretOrKey: process.env.REFRESH_TOKEN_SECRET,
        passReqToCallback: true
      },
      async(req, jwtPayload, done) => {
        try {
          const {refreshId} = jwtPayload;

          const refresh = await getRefreshTokenByIdAndPopulateByUser(refreshId);

          if (!refresh){
            return done(null, false, 'No valid');
          }
          if (refresh.idUser.isBlocked){
            return done(null, false, 'User was blocked');
          }

          if (
            refresh.idUser && refresh.ip === req.clientIp && moment()
              .isBefore(refresh.validUntil)
          ){
            return done(null, refresh);
          }
          return done(null, false);
        }
        catch (e){
          return done(e, false, e.message);
        }
      }
    )
  );

  passport.use(
    'admin',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_SECRET,
        passReqToCallback: true
      },
      async(req, jwtPayload, done) => {
        try {
          const {
            _id
          } = jwtPayload;

          const user = await findUserById(_id);


          if (user.isAdmin){
            return done(null, false, 'User is not admin!');
          }

          return done(null, user);
        }
        catch (e){
          return done(e, false, e.message);
        }
      }
    )
  );
};

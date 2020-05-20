const { Strategy: jwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { SECRET_KEY } = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          console.log('Error ....', err);
        });
    })
  );
};

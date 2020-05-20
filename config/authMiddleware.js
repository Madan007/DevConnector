const passport = require('passport');
const util = require('util');

const nonSecureUrl = ['/user/test'];

exports.authenticate = async (req, res, next) => {
  util.promisify(passport.authenticate);
  const user = await passport.authenticate('jwt', { session: false });
  if (!user && nonSecureUrl.includes(req.originalUrl)) return next();
  return next();
};

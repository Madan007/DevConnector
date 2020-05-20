const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { SECRET_KEY } = require('../../config/keys');
const util = require('util');

const User = require('../../models/User');

util.promisify(bcrypt.genSalt);
util.promisify(bcrypt.hash);
util.promisify(jwt.sign);

exports.register = async (name, email, password) => {
  const userDetail = await User.findOne({ email: req.body.email });
  if (userDetail) {
    throw { message: 'Email Already Exists' };
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  const newUser = new User({
    name,
    email,
    avatar: null,
    password: hash,
  });

  const user = await newUser.save();
  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw { message: 'User Not Found' };

  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) throw { message: 'User Not Found' };

  const tokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: 120 });
  return token;
};

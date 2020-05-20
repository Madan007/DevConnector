const userService = require('./service');

exports.test = async (req, res, next) => {
  res.json('Hi Welcome to users ');
};

exports.testAuth = async (req, res, next) => {
  // res.user will have the user details populated at passport middleware
  res.json({ message: 'Success', data: req.user });
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  userService.register(name, email, password);
  return res.json(user);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const token = userService.login(email, password);
  return res.json({
    message: 'Login Successfull',
    token: `Bearer ${token}`,
  });
};

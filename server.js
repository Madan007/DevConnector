const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes');
const { authenticate } = require('./config/authMiddleware');

const app = express();

//DB Configuration
const { MONGO_URI: db, ROOT_URL: rootUrl } = require('./config/keys');
//connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected Succesfully'))
  .catch((err) => console.log('Error in connecting with mongoDb', err));

const port = process.env.PORT || 5000;

// Passport Configuration
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(rootUrl, authenticate, routes);
app.use(bodyParser.json());

app.use('*', (req, res) => {
  return res.status(404).json({ messsage: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.log('Caught Error in Application please handle it!', err);
  res.json({ message: err.message || 'Internal Server Error' });
});

process.on('uncaughtException', (err) => {
  console.log('Un Caught Exception ....', err);
});

process.on('unhandledRejection', (err) => {
  console.log('Un Caught Rejection ..', err);
});

app.listen(port, () => console.log(`server running on port ${port}`));

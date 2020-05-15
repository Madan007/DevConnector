const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//DB Configuration
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected Succesfully'))
  .catch((err) => console.log('Error in connecting with mongoDb', err));

const port = process.env.PORT || 5000;

app.use('/api/v1', routes);
app.use(bodyParser.json());

app.get('/', (req, res) => res.json('Hello!'));

app.listen(port, () => console.log(`server running on port ${port}`));

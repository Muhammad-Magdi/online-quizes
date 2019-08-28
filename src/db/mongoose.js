const mongoose = require('mongoose');

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'online-quizes-api';

mongoose.connect(dbURL.concat('/', dbName), {
  useNewUrlParser: true,
  useCreateIndex: true,
});

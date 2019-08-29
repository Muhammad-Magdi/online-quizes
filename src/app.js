const express = require('express');
const quizRouter = require('./routers/quiz');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(quizRouter);

module.exports = app;

const express = require('express');
const quizRouter = require('./routers/quiz');
require('./db/mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(quizRouter);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

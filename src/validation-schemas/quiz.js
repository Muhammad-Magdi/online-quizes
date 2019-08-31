const joi = require('joi');
const questionSchema = require('./question');

const quizSchema = {
  title: joi.string().required(),
  questions: joi.array().items(questionSchema),
};

module.exports = quizSchema;

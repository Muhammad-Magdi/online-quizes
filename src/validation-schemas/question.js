const joi = require('joi');


const questionSchema = {
  type: joi.string().required().valid(['mcq-1', 'mcq-check', 'short-text']),
  statement: joi.string().required(),
  degree: joi.number().required().min(0),
  correctAnswers: joi.array().items(joi.string())
    .when('type', { is: joi.only('mcq-1'), then: joi.array().length(1).required() })
    .when('type', { is: joi.only('mcq-check'), then: joi.array().min(1).required() }),
  wrongAnswers: joi.array().items(joi.string()),
};

module.exports = questionSchema;

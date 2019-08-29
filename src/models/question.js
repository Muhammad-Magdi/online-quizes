const mongoose = require('mongoose');
const answerSchema = require('./answer').schema;

const questionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  answers: {
    type: [answerSchema],
    required: true,
    validate(answers) {
      if (!answers.some((answer) => answer.accepted)) {
        throw new Error('A Question must have at least a correct answer!');
      }
    },
  },
  degree: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error('Degree must be a non-negative number!');
      }
    },
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

const mongoose = require('mongoose');
const answerSchema = require('./answer').schema;

const questionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  answers: [answerSchema],
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

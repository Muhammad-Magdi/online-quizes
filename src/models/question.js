const mongoose = require('mongoose');

/**
 * Questions come in 3 types:
 *  1- MCQ Questions that have only one correct answer
 *  2- MCQ Questions that have one or more correct answer
 *  3- Short Text Questions that may have any number of correct answers
 */

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['mcq-1', 'mcq-check', 'short-text'],
  },
  statement: {
    type: String,
    required: true,
  },
  correctAnswers: {
    type: [String],
    // TODO - doesn't work - but validate covers
    required: function() {
      return this.type !== 'short-text';
    },
  },
  wrongAnswers: {
    type: [String],
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

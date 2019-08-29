const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  accepted: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;

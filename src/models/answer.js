const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  accepted: {
    type: Boolean,
    required: true,
  },
  text: String,
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;

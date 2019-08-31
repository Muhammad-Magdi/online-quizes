const express = require('express');
const joi = require('joi');
const Quiz = require('../models/quiz');
const Question = require('../models/question');
const auth = require('../middlewares/auth');
const questionSchema = require('../validation-schemas/question');
const quizSchema = require('../validation-schemas/quiz');

const router = new express.Router();


/**
 * POST /quizes
 * 0- authenticates
 * 1- validates the given Quiz.
 * 2- saves it.
 * 3- sends the quiz back with 'created' status
 */
router.post('/quizes', auth, async (req, res) => {
  try {
    await joi.validate(req.body, quizSchema);
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});


/**
 * POST /quizes/:quizId/questions
 * 0- authenticates
 * 1- validates the given Question.
 * 2- creates the Question
 * 3- pushes this question in quiz with id = quizId
 * 4- assures that a quiz with the given quizId was found and modified
 * 4- sends the question back with 'created' status
 */
router.post('/quizes/:quizId/questions', auth, async (req, res) => {
  try {
    await joi.validate(req.body, questionSchema);
    const question = new Question(req.body);
    const modefied = await Quiz.updateOne({ _id: req.params.quizId }, {
      $push: { questions: question },
    });
    if (!modefied.n) {
      throw new Error('Invalid Quiz id!');
    }
    res.statuc(201).send(question);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

/**
 * GET /quizes
 * returns all the quizes back with 'ok' status
 */
router.get('/quizes', async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.send(quizes);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * GET /quizes/:quizId
 * 1- retrieves the quiz from the database
 * 2- assures that a quiz with this quizId exists
 * 3- sends it back with 'ok' status
 */
router.get('/quizes/:id', async ({ params: { id } }, res) => {
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      throw new Error('Invalid Quiz id!');
    }
    res.send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * DELETE /quizes/:quizId/questions/:questionId
 * 0- authenticates
 * 1- pull a question with quistionId from a quiz with quizId
 * 2- assures that a quiz with the given quizId was modified
 * 3- assures that a question with the given questionId was pulled
 * 4- sends back an 'ok' status
 */
router.delete('/quizes/:quizId/questions/:questionId', auth,
  async ({ params: { quizId, questionId } }, res) => {
    try {
      const modefied = await Quiz.updateOne({ _id: quizId }, {
        $pull: { questions: { _id: questionId } },
      }, { new: true });
      if (!modefied.n) {
        throw new Error('Invalid Quiz id!');
      }
      if (!modefied.nModified) {
        throw new Error('Invalid Question id!');
      }
      res.send();
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

module.exports = router;

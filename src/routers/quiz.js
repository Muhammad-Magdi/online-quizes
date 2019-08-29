const express = require('express');
const Quiz = require('../models/quiz');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/quizes', auth, async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    await quiz.save();
    res.status(201).send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/quizes/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new Error('Invalid Quiz id!');
    }
    quiz.questions.push(req.body);
    await quiz.save();
    res.send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/quizes', async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.send(quizes);
  } catch (e) {
    res.status(500).send(e);
  }
});

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

router.delete('/quizes/:quizId/:questionId', auth,
  async ({ params: { quizId, questionId } }, res) => {
    try {
      const modefied = await Quiz.update({ _id: quizId }, {
        $pull: { questions: { _id: questionId } },
      }, { new: true });
      if (!modefied.n) {
        throw new Error('Invalid Quiz id!');
      }
      if (!modefied.nModified) {
        throw new Error('Invalid Question id!');
      }
      res.send(modefied);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

module.exports = router;

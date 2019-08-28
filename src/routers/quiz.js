const express = require('express');
const Quiz = require('../models/quiz');

const router = new express.Router();

router.post('/quizes', async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    await quiz.save();
    res.status(201).send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/quizes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new Error('Invalid Quiz id!');
    }
    quiz.questions.push(req.body);
    await quiz.save();
    res.status(200).send(quiz);
  } catch (e) {
    res.status(500).send(e);
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
    res.status(200).send(quiz);
  } catch (e) {
    res.status(500).send(e);
  }
});

// I think this is not the best way
// It fetches the whole quiz to delete a question
// But it works for now
router.delete('/quizes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new Error('Invalid Quiz id!');
    }
    quiz.questions.id(req.body._id).remove();
    await quiz.save();
    res.status(200).send(quiz);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

const request = require('supertest');
const app = require('../src/app');
const Quiz = require('../src/models/quiz');
const {
  authToken,
  validTitle,
  emptyString,
  validStatement,
  validDegree,
  invalidDegreeType,
  invalidDegreeValue,
  validText,
  validAcceptedAnswer,
  validRejectedAnswer,
  validQuestion,
  validQuiz,
} = require('./test-fields');

var tmpQuizId;

beforeEach(async () => {
  await Quiz.deleteMany();
  const quiz = new Quiz(validQuiz);
  await quiz.save();
  tmpQuizId = quiz._id;
});

/**
 * Create Quiz Route Tests
 */
test('Should Create a new Quiz', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .send(validQuiz)
    .expect(201)
});

test('Should Create a new Quiz - without questions', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .send({
      title: validTitle,
    })
    .expect(201)
});

test('Should fail to authenticate - wrong header', async () => {
  await request(app).post('/quizes')
    .set('Authorization', authToken)
    .send(validQuiz)
    .expect(401)
});

test('Should fail to authenticate - no token', async () => {
  await request(app).post('/quizes')
    .send(validQuiz)
    .expect(401)
});

test('Should fail to create a new Quiz - no quiz passed', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .expect(400)
});

test('Should fail to create a new Quiz - no title added', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .send({
      questions:[
        validQuestion,
      ],
    })
    .expect(400)
});

test('Should fail to create a new Quiz - invalid Question - no statement', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .send({
      title: validTitle,
      questions:[
        {
          answers: [
            validAcceptedAnswer,
            validRejectedAnswer,
          ]
        }
      ],
    })
    .expect(400)
});

test('Should fail to create a new Quiz - invalid Question - no answers', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .send({
      title: validTitle,
      questions:[
        {
          statement: validStatement,
          answers: [],
        }
      ],
    })
    .expect(400);
});

test('Should Fail to create a new Quiz - invalid Question - no Correct Answers', async () => {
  await request(app).post('/quizes')
    .set('x-fake-token', authToken)
    .send({
      title: validTitle,
      questions: [
        {
          statement: validStatement,
          degree: validDegree,
          answers:[
            validRejectedAnswer,
            validRejectedAnswer,
          ],
        }
      ],
    })
    .expect(400);
});
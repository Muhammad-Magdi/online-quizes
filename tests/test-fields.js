var authToken = process.env.ACCEPTEDTOKEN;
var tmpQuizId;

const validTitle = 'Algorithms Quiz #2';
const emptyString = '';
const validStatement = 'What\'s the Time Complexity of Binary Search?';
const validDegree = 5;
const invalidDegreeType = 'Ahmed';
const invalidDegreeValue = -10;
const validText = 'O(log(n))';

const validAcceptedAnswer = {
  text: validText,
  accepted: true,
};

const validRejectedAnswer = {
  text: validText,
  accepted: false,
}

const validQuestion = {
  statement: validStatement,
  degree: validDegree,
  answers: [validAcceptedAnswer, validRejectedAnswer],
}

const validQuiz = {
  title: validTitle,
  questions: [validQuestion],
};

module.exports = {
  authToken,
  tmpQuizId,
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
};

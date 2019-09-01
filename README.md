# online-quizes

## Schemas:

1. Quiz, Each Quiz is described by:
   - A Required `title`.
   - Zero or more `questions`.

2. Questions, A Question is described by:
   - A Required `statement`.
   - A Required `degree` with non-negative value.
   - An array of `correctAnswers`.
   - An optional array of `wrongAnswers`.
   - A Required `type` that's a value of:
     - `mcq-1`: Multiple Choice Questions that must have exactly one correct Answer.
     - `mcq-check`: Multiple Choice Questions that must have at least one correct Answer (CheckBox Style).
     - `short-text`: Questions that have a short text answers.

## Usage:
Send requests to https://magdi-online-quizes.herokuapp.com suffixed by a valid path.

## Endpoints:

### Create new Quiz:
`POST` on `https://magdi-online-quizes.herokuapp.com/quizes` with:
- A valid quiz in the body.
- An Authentication token in the `x-fake-token` HTTP header with the value `HelloWorld`.

### Create a Question in a Quiz:
`POST` on `https://magdi-online-quizes.herokuapp.com/quizes/:quizId/questions` with:
- A valid question in the body.
- An Authentication token in the `x-fake-token` HTTP header with the value `HelloWorld`.

### List All Quizes:
`GET` from `https://magdi-online-quizes.herokuapp.com/quizes`.

### Show Quiz & Associated Questions:
`GET` from `https://magdi-online-quizes.herokuapp.com/quizes/:quizId` with:
- A valid quiz `_id`.

### Delete A Question from a Quiz:
`DELETE` from `https://magdi-online-quizes.herokuapp.com/quizes/:quizId/questions/questionId` with:
- A valid quiz `_id`.
- A valid question `_id`.

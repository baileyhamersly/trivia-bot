//trivia api
exports.getTrivia = async () => {
  const response = await fetch(`https://the-trivia-api.com/v2/questions/`);
  const data = await response.json();
  if (data && data[0]) {
    return {
      question: data[0].question.text,
      answer: data[0].correctAnswer,
      choices: data[0].incorrectAnswers,
      difficulty: data[0].difficulty,
    };
  } else {
    throw new Error("Trivia data not available.");
  }
};

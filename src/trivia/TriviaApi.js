//trivia api
export const getTrivia = async () => {
    console.log("resetting trivia");
    trivia = {};
    fetch(`https://the-trivia-api.com/v2/questions/`)
        .then((response) => response.json())
        .then((data) => {
        trivia.question = data[0].question.text;
        trivia.answer = data[0].correctAnswer;
        })
        .catch((error) => {
        console.log("Error message: ", error);
        });
  };
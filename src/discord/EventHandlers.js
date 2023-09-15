//discord client event handling
const { discordClient } = require("./ClientConfig");
//const { getTrivia } = require("../trivia/triviaApi");
const { similarity } = require("../util/Utils");
const { codeBlock } = require("discord.js");

let trivia = {};
let triviaCalled = false;

discordClient.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
  getTrivia();
});

discordClient.on("messageCreate", async (message) => {
    if (similarity("Trivia Please", message.content) >= 0.8) {
        if (!triviaCalled) {
              await getTrivia().then(() => {
                setTimeout(function () {
                  if (trivia?.question) {
                    triviaCalled = true;
                    message.reply(trivia.question + "\n" + codeBlock("To get the answer, say 'Answer Please', to get a new question say 'Trivia Please'"))
                  } else {
                    message.reply(
                      "Something has gone wrong with the connection with the trivia API. :( Tell Bailey to get off Baldur's Gate and fix it."
                    );
                  }
                }, 1000);
              });
        }
    } else {
        if (similarity(message.content, trivia.answer) >= 0.8) {
          triviaCalled = false;
          message.reply("That's Right! The answer was '" + trivia.answer + "'");
        }
        if (similarity(message.content, "Answer Please")>= 0.8) {
            triviaCalled = false;
            message.reply("You tried your best and that's what really counts. The answer was '" + trivia.answer + "'");
        }
    }
});

//TODO: put this in its own file: TriviaApi.js
const getTrivia = async () => {
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
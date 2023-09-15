//discord client event handling
const { discordClient } = require("./ClientConfig");
const { getTrivia } = require("../trivia/TriviaApi");
const { similarity } = require("../util/Utils");
const { codeBlock } = require("discord.js");

let trivia = {};

discordClient.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
  getTrivia();
});

discordClient.on("messageCreate", async (message) => {
    if (similarity("Trivia Please", message.content) >= 0.8) {
      try {
        const triviaData = await getTrivia();
        if (triviaData) {
          message.reply(
            triviaData.question + "\n" +
              codeBlock("To get the answer, say 'Answer Please', to get a new question say 'Trivia Please'")
          );
          trivia.answer = triviaData.answer;
          trivia.question = triviaData.question;
        } else {
          message.reply(
            "Something has gone wrong with the connection with the trivia API. :( Tell Bailey to get off Baldur's Gate and fix it."
          );
        }
      } catch (error) {
        console.error("Error fetching trivia:", error);
        message.reply("An error occurred while fetching trivia data.");
      }
    } else {
        if (similarity(message.content, trivia.answer) >= 0.8) {
          message.reply("That's Right! The answer was '" + trivia.answer + "'");
        }
        if (similarity(message.content, "Answer Please")>= 0.8) {
            message.reply("You tried your best and that's what really counts. The answer was '" + trivia.answer + "'");
        }
    }
});
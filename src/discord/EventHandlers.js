//discord client event handling
const { discordClient } = require("./ClientConfig");
const { getTrivia } = require("../trivia/TriviaApi");
const { similarity } = require("../util/Utils");
const { codeBlock } = require("discord.js");
const {
  ANSWER_PLEASE,
  SOMETHING_WENT_WRONG,
  ERROR_FETCHING_DATA,
  CORRECT,
  GOOD_TRY,
} = require("../util/Constants");

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
        message.reply(triviaData.question + "\n" + codeBlock(ANSWER_PLEASE));
        trivia.answer = triviaData.answer;
        trivia.question = triviaData.question;
      } else {
        message.reply(SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      console.error("Error fetching trivia:", error);
      message.reply(ERROR_FETCHING_DATA);
    }
  } else {
    if (similarity(message.content, trivia.answer) >= 0.8) {
      message.reply(CORRECT + trivia.answer + "'");
    }
    if (similarity(message.content, "Answer Please") >= 0.8) {
      message.reply(GOOD_TRY + trivia.answer + "'");
    }
  }
});

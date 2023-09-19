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
        message.reply(
          triviaData.question +
            "\n" +
            codeBlock(
              "To get the answer, say 'Answer Please', to get a new question say 'Trivia Please'"
            )
        );
        trivia.answer = triviaData.answer;
        trivia.question = triviaData.question;
        trivia.choices = triviaData.choices;
        trivia.difficulty = triviaData.difficulty;
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
      console.log("resetting trivia");
      trivia = {};
    }
    if (similarity(message.content, "Answer Please") >= 0.8) {
      message.reply(
        "You tried your best and that's what really counts. The answer was '" +
          trivia.answer +
          "'"
      );
    }
    if (similarity("Please Help", message.content) >= 0.8) {
      if (
        trivia.choices &&
        ("hard" === trivia.difficulty || "medium" === trivia.difficulty)
      ) {
        message.reply(
          "Fine, I'll make it a bit easier. How about multiple choice?" +
            "\nA: " +
            trivia.choices[0] +
            "\nB: " +
            trivia.choices[1] +
            "\nC: " +
            trivia.choices[2] +
            "\nD: " +
            trivia.answer
        );
      } else {
        message.reply(
          "https://tenor.com/view/hal9000-hal-2001-a-space-odyssey-2001a-space-odyssey-gif-21408319"
        );
      }
    }
  }
});

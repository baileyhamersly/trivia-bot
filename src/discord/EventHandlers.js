//discord client event handling
const { discordClient } = require("./ClientConfig");
const { getTrivia } = require("../trivia/TriviaApi");
const { similarity, percentOdds } = require("../util/Utils");
const { codeBlock } = require("discord.js");
const {
  ANSWER_PLEASE,
  SOMETHING_WENT_WRONG,
  ERROR_FETCHING_DATA,
  CORRECT,
  GOOD_TRY,
  GOOD_TRY_JEFF,
  JEFF,
  PAUL_RUDD_GIF,
  HAL_9000_GIF,
  MULTIPLE_CHOICE,
  DIFFICULTY,
  WHICH_OF_THESE,
} = require("../util/Constants");

let trivia = {};
let triviaCalled = false;

discordClient.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
  getTrivia();
});

discordClient.on("messageCreate", async (message) => {
  if (similarity("Trivia Please", message.content) >= 0.8) {
    try {
      const triviaData = await getTrivia();
      if (triviaData) {
        trivia.answer = triviaData.answer;
        trivia.question = triviaData.question;
        trivia.choices = triviaData.choices;
        trivia.difficulty = triviaData.difficulty;
        trivia.choices.push(trivia.answer);
        trivia.choices.sort();
        if (triviaData.question.includes(WHICH_OF_THESE)) {
          message.reply(
            triviaData.question +
              "\n" +
              displayMultipleChoice() +
              codeBlock(ANSWER_PLEASE)
          );
        } else {
          message.reply(triviaData.question + "\n" + codeBlock(ANSWER_PLEASE));
        }
        triviaCalled = true;
      } else {
        message.reply(SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      console.error(ERROR_FETCHING_DATA, error);
      message.reply(ERROR_FETCHING_DATA);
    }
  } else {
    if (similarity(message.content, trivia.answer) >= 0.8) {
      message.reply(CORRECT + trivia.answer + "'");
      resetTrivia();
    }
    if (similarity(message.content, "Answer Please") >= 0.8 && triviaCalled) {
      if (message.author.globalName === JEFF && percentOdds(25)) {
        message.reply(PAUL_RUDD_GIF);
        setTimeout(function () {
          message.reply(GOOD_TRY_JEFF + trivia.answer + "'");
        }, 5000);
      } else {
        message.reply(GOOD_TRY + trivia.answer + "'");
      }
      resetTrivia();
    }
    if (similarity("Help Please", message.content) >= 0.8 && triviaCalled) {
      console.log(trivia.difficulty);
      if (
        (trivia.choices && DIFFICULTY.HARD === trivia.difficulty) ||
        DIFFICULTY.MEDIUM === trivia.difficulty
      ) {
        message.reply(MULTIPLE_CHOICE + displayMultipleChoice());
      } else {
        message.reply(HAL_9000_GIF);
        message.reply("Really? this should be easy!!!");
      }
    }
  }
});

const resetTrivia = () => {
  console.log("resetting trivia");
  trivia = {};
  triviaCalled = false;
};

const displayMultipleChoice = () => {
  return codeBlock(
    "\nA: " +
      trivia.choices[0] +
      "\nB: " +
      trivia.choices[1] +
      "\nC: " +
      trivia.choices[2] +
      "\nD: " +
      trivia.choices[3]
  );
};

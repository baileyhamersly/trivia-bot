//discord client event handling
const { discordClient } = require("./ClientConfig");
const { getTrivia } = require("../trivia/TriviaApi");
const { similarity, percentOdds } = require("../util/Utils");
const { codeBlock } = require("discord.js");
const {
  ANSWER_HELP_INFO,
  NEW_QUESTION_INFO,
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
  const userMessageLower = message?.content?.toLowerCase();
  if (
    similarity("trivia please", userMessageLower) >= 0.8 ||
    userMessageLower === "tp"
  ) {
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
              codeBlock(ANSWER_HELP_INFO)
          );
        } else {
          message.reply(
            triviaData.question + "\n" + codeBlock(ANSWER_HELP_INFO)
          );
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
    let answerLower = trivia?.answer?.toLowerCase();
    if (
      similarity(userMessageLower, answerLower) >= 0.8 ||
      (userMessageLower.length > 4 && answerLower?.includes(userMessageLower))
    ) {
      message.reply(
        CORRECT + trivia.answer + "'" + codeBlock(NEW_QUESTION_INFO)
      );
      resetTrivia();
    }
    if (
      (similarity(userMessageLower, "answer please") >= 0.8 ||
        userMessageLower === "ap") &&
      triviaCalled
    ) {
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
    if (
      (similarity("help please", userMessageLower) >= 0.8 ||
        userMessageLower === "hp") &&
      triviaCalled
    ) {
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

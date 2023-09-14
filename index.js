import dotenv from "dotenv";

import { Client, IntentsBitField, codeBlock } from "discord.js";

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
  getTrivia();
});

let trivia = {};
let triviaCalled = false;

const getTrivia = async () => {
  if (!triviaCalled) {
    console.log("resetting trivia");
    trivia = {};
    fetch(`https://the-trivia-api.com/v2/questions/`)
      .then((response) => response.json())
      .then((data) => {
        triviaCalled = true;
        trivia.question = data[0].question.text;
        trivia.answer = data[0].correctAnswer;
      })
      .catch((error) => {
        console.log("Error message: ", error);
      });
  }
};

client.on("messageCreate", async (message) => {
  if (similarity("Trivia Please", message.content) >= 0.8) {
    await getTrivia().then(() => {
      setTimeout(function () {
        if (trivia?.question) {
          message.reply(trivia.question + "\n" + codeBlock("To get the answer, say 'Answer Please', to get a new question say 'Trivia Please'"))
        } else {
          message.reply(
            "Something has gone wrong with the connection with the trivia API. :( Tell Bailey to get off Baldur's Gate and fix it."
          );
        }
      }, 1000);
    });
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

function similarity(s1, s2) {
  if (s1 && s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    );
  }
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

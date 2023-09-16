//discord bot client config
const { Client, IntentsBitField } = require("discord.js");
const { token } = require("../../config.json");

exports.discordClient = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

exports.discordToken = token;

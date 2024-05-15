//discord bot client config
const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

exports.discordClient = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

exports.discordToken = dotenv.DISCORD_TOKEN;

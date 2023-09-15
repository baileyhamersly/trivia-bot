//discord bot client config
import dotenv from "dotenv";
import { Client, IntentsBitField } from "discord.js";

dotenv.config();

export const discordClient = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

export const discordToken = process.env.DISCORD_TOKEN;
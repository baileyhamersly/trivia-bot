const { discordClient, discordToken } = require('./src/discord/ClientConfig');
require('./src/discord/EventHandlers');

discordClient.login(discordToken);

const { discordClient, discordToken } = require('./discord/ClientConfig');
require('./discord/EventHandlers');

discordClient.login(discordToken);

const port = 8080;
const { discordClient, discordToken } = require("./src/discord/ClientConfig");
require("./src/discord/EventHandlers");

app.listen(port, () => {
  console.log('trivia-bot listening on port', port);
});

discordClient.login(discordToken);
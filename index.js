const port = 8080;

app.listen(port, () => {
    console.log('trivia-bot listening on port', port);
  });
  
const { discordClient, discordToken } = require("./src/discord/ClientConfig");
require("./src/discord/EventHandlers");


discordClient.login(discordToken);
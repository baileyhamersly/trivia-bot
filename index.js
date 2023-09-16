const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
  
const { discordClient, discordToken } = require("./src/discord/ClientConfig");
require("./src/discord/EventHandlers");


discordClient.login(discordToken);
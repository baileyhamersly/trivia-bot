import { discordClient, discordToken } from "./src/discord/ClientConfig";
import "./EventHandlers";

discordClient.login(discordToken);

import { discordClient, discordToken } from "./src/config/config";
import "./EventHandlers";

discordClient.login(discordToken);

import DiscordJS, {
  ActivityType,
  IntentsBitField,
  TextChannel,
} from "discord.js";
import "dotenv/config";
import path from "path";
import WOK from "wokcommands";
import data from "./data.json";

const keywords = data.keywords;

const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
  ],
});

client.once("ready", async () => {
  console.log(`THE BOT IS ONLINE`);
  client.user?.setPresence({
    activities: [{ name: `fire's screenshare`, type: ActivityType.Watching }],
    status: "dnd",
  });
  new WOK({
    commandsDir: path.join(__dirname, "commands"),
    client,
    testServers: [`${process.env.TEST_SERVER}`],
  });
});

client.on("messageCreate", (message) => {
  if(keywords.some((match) => new RegExp('\\b'+match.toLowerCase()+'\\b').test(message.toString().toLowerCase()))) {
    message.reply(data.gifs.coalalarm);
  }
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (newState.member!.id == process.env.ID && oldState.channelId === null) {
    let username = client.users.cache.get(process.env.ID);
    (client.channels.cache.get(data.ids.bigbill) as TextChannel).send(
      `${username?.displayName} is in VC!, <@${process.env.SKXTCHID}>`
    );
  }
});

client.login(process.env.TOKEN);

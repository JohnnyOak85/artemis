import { Client, GatewayIntentBits } from "discord.js";
import { getCommand, registerCommands } from "./commands";
import shame from "./commands/shame";
import fix from "./commands/fix";
import quote from "./commands/quote";
import react from "./tools/react";
import { config } from "dotenv";

const commands = [shame, fix, quote];

const { parsed } = config();

if (!parsed) {
  console.error("Environment file missing");
  process.exit();
}

const { GUILD, TOKEN } = parsed;

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}!`);

  registerCommands(client.token, client.user.id, GUILD, commands);
});

client.on("messageCreate", (message) => react(message));

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = getCommand(interaction.commandName);

  if (!command) {
    return;
  }

  command.execute(interaction);
});

client.login(TOKEN);

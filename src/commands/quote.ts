import { CommandInteraction, EmbedBuilder } from "discord.js";
import { buildCommand } from "../commands";
import { randomIndex } from "../tools/randomizer";
import fetchDocument from "../tools/fetch";

const command = {
  data: buildCommand({
    name: "quote",
    description: "Sends a random quote",
  }),
  execute: async (interaction: CommandInteraction) => {
    const quotes = fetchDocument<string[]>("fixes");

    if (!quotes) {
      return;
    }

    const quote = quotes[randomIndex(quotes)];
    const [name, value] = quote.split("\n");
    const embed = new EmbedBuilder().setFields({
      name,
      value,
    });

    interaction.channel?.send({ embeds: [embed] });
  },
};

export default command;

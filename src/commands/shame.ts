import { CommandInteraction } from "discord.js";
import { buildCommand } from "../commands";
import fetchDocument from "../tools/fetch";
import { randomIndex } from "../tools/randomizer";

const command = {
  data: buildCommand({
    name: "shame",
    description: "Shame a user for sharing the same thing again.",
    options: [
      {
        name: "target",
        description: "The user to shame",
        required: true,
        type: "user",
      },
    ],
  }),
  execute: async (interaction: CommandInteraction) => {
    const shames = fetchDocument<string[]>("shame");

    if (!shames) {
      return;
    }

    const shame = shames[randomIndex(shames)];

    const [target] = interaction.options.data;

    interaction.channel?.send({
      content: `<@${target.user?.id}>`,
      files: [shame],
    });
  },
};

export default command;

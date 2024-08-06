import { CommandInteraction } from "discord.js";
import { buildCommand } from "../commands";
import fetchDocument from "../tools/fetch";

type Fix = [string, string];

const command = {
  data: buildCommand({
    name: "fix",
    description: "Fix an external link's embed.",
    options: [
      {
        name: "link",
        description: "The link to fix",
        required: true,
        type: "string",
      },
    ],
  }),
  execute: async (interaction: CommandInteraction) => {
    const fixes = fetchDocument<Fix[]>("fixes");
    const [link] = interaction.options.data;
    let edited = "";

    if (typeof link?.value !== "string" || !fixes) {
      return;
    }

    for (const entry of fixes) {
      const [url, fix] = entry;

      if (link.value.includes(url)) {
        edited = link.value.replace(url, fix);
      }
    }

    if (!edited) {
      return;
    }

    interaction.channel?.send(edited);
  },
};

export default command;

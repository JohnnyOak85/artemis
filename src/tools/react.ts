import { Message } from "discord.js";
import { roshambo } from "./randomizer";
import fetchDocument from "./fetch";

type ReactionMap = { [word: string]: string };

const react = (message: Message) => {
  const reactions = fetchDocument<ReactionMap>("reactions");

  if (!reactions) {
    return;
  }

  const words = message.content.toLowerCase().split(" ");
  let canReact = roshambo();

  for (const word of words) {
    const reaction = reactions[word];

    if (!canReact || !reaction) {
      break;
    }

    message.react(reaction);
    canReact = false;
  }
};

export default react;

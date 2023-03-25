import { DiscordEvent, SharedEvents } from '../../shared';
import { InteractionCreateEvent } from './interactionCreate.event';
import { MessageCreateEvent } from './messageCreate.event';
import { ReadyEvent } from './ready.event';

export const Events = [
    ...SharedEvents,
    InteractionCreateEvent,
    MessageCreateEvent,
    ReadyEvent
] as DiscordEvent[];

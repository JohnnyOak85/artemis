import { InteractionCreateEvent } from '../../moderation/events/interactionCreate.event';
import { ReadyEvent } from '../../quotes/events/ready.event';
import { DiscordEvent, SharedEvents } from '../../shared';

export const Events = [...SharedEvents, InteractionCreateEvent, ReadyEvent] as DiscordEvent[];

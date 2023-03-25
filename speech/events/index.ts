import { DiscordEvent, SharedEvents } from '../../shared';
import { MessageCreateEvent } from './messageCreate.event';

export const Events = [...SharedEvents, MessageCreateEvent] as DiscordEvent[];

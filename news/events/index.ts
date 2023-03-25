import { DiscordEvent, SharedEvents } from '../../shared';
import { ReadyEvent } from './ready.event';

export const Events = [...SharedEvents, ReadyEvent] as DiscordEvent[];

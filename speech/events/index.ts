import { Event, SharedEvents } from '../../shared';
import { MessageCreateEvent } from './messageCreate';

export const Events = [...SharedEvents, MessageCreateEvent] as Event[];

import { Events, Message } from '../../shared';
import { checkMessage } from '../helpers';

export const MessageCreateEvent = {
    name: Events.MessageCreate,
    execute: (message: Message<true>) => checkMessage(message)
};

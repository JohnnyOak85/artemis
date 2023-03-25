import { Collector, Message } from '../../../shared';

const store = new Collector<Message<true>>();
const key = 'message';

export const MessageStore = {
    saveMessage: (message: Message<true>) => {
        store.put(key, message);
    },
    clearMessage: () => {
        const message = store.get(key);

        message?.delete();
    },
    deleteMessage: () => {
        store.delete(key);
    }
};

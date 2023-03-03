import { Collector } from '../../../commons';
import { DiscordMessage } from '../../../commons/discord';

const store = new Collector<DiscordMessage>();
const key = 'message';

export default {
    saveMessage: (message: DiscordMessage) => {
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

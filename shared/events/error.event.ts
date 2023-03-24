import { ErrorEvent as Error, Events, logError } from '..';

export const ErrorEvent = {
    name: Events.Error,
    execute: (error: Error) => {
        logError(error, 'reminder-main');
    }
};

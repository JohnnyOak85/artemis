import { createLogger, format, transports } from 'winston';
const { combine, errors, prettyPrint, timestamp } = format;

const logger = createLogger({
    format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        prettyPrint()
    ),
    transports: [new transports.File({ filename: 'error.log', level: 'error' })]
});

export const logError = (error: any, method: string) => logger.error(`${method} -> ${error}`);

import winston from 'winston';

/**
 * Define our custom logger
 */
const logger = winston.createLogger({
  transports: [ new winston.transports.Console() ],
})

export default logger;

import winston from 'winston';

export interface LoggerMetadata {
  requestId?: string;
  mobapp_id?: string;
  customer_id?: string;
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [new winston.transports.Console()],
});

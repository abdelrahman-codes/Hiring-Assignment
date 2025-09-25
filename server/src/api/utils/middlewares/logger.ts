/**
 * @file logger.ts
 * @description Configures and exports a centralized Winston logger instance.
 * The logger is set up for logging to the console and to date-stamped rotating files.
 */

import DailyRotateFile from "winston-daily-rotate-file";
import { createLogger, format, transports, Logger } from "winston";

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }: any) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create the logger
const logger: Logger = createLogger({
  level: "info", // Default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    colorize(), // Colorize logs for console
    logFormat // Custom format
  ),
  transports: [
    new transports.Console(), // Log to console
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

// Export the logger
export default logger;

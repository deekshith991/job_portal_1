// utils/logger.js

class Logger {
  static info(message, data = {}) {
    console.log(`INFO: ${message}`, data);
  }

  static warn(message, data = {}) {
    console.warn(`WARN: ${message}`, data);
  }

  static error(message, data = {}) {
    console.error(`ERROR: ${message}`, data);
  }
}

export default Logger;

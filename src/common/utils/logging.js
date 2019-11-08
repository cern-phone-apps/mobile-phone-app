/* eslint-disable no-console */
const debug = require('debug');

/**
 * Initializes the different application's logs methods
 * @type {Function}
 */
const errorMessage = debug('APP:ERROR');
const warnMessage = debug('APP:WARN');
const infoMessage = debug('APP:INFO');
const logMessage = debug('APP:LOG');

const toneMessage = infoMessage.extend('TONE');
const toneInMessage = toneMessage.extend('TONE_IN');
const toneOutMessage = toneMessage.extend('TONE_OUT');

const actionMessage = infoMessage.extend('ACTION');

/**
 * On production, only error and info will be available.
 * On development and test, logMessage is also available
 */
if (process.env.NODE_ENV === 'production') {
  debug.enable('APP:ERROR,APP:INFO,APP:INFO:*');
} else {
  debug.enable('APP:*');
}

export {
  errorMessage,
  warnMessage,
  infoMessage,
  logMessage,
  toneInMessage,
  toneOutMessage,
  actionMessage
};

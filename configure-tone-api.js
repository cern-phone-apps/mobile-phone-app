import { DialSingleton } from 'tone-api-mobile';
import eventHandler from './src/calls/providers/PhoneProvider/tone-event-handler';
import { logMessage } from './src/common/utils/logging';

/**
 * Initializes the Tone JS API to make and receive calls
 */
const configureToneApi = () => {
  logMessage('configureToneApi');
  const isDev = false;
  const toneAPI = DialSingleton.getInstance(isDev);
  if (toneAPI.getNotifier()) {
    toneAPI.getNotifier().on('ToneEvent', event => {
      eventHandler(event, toneAPI);
    });
  }
  return toneAPI;
};
/**
 * Export the toneAPI already initialized
 */
const toneAPI = configureToneApi();

export { toneAPI };

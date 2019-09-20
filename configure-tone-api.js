import { AppState } from 'react-native';
import { DialSingleton } from 'tone-api-mobile';
import eventHandler from './src/calls/providers/PhoneProvider/tone-event-handler';

const isInBackground = AppState.currentState.match(/inactive|background/);

const configureToneApi = () => {
  console.log('configureToneApi');
  const toneAPI = DialSingleton.getInstance();
  if (toneAPI.getNotifier()) {
    toneAPI.getNotifier().on('ToneEvent', event => {
      eventHandler(event, toneAPI, isInBackground);
    });
  }
  return toneAPI;
};

const toneAPI = configureToneApi();

export { toneAPI, isInBackground };

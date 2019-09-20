import RNCallKeep from 'react-native-callkeep';

import { toneAPI, isInBackground } from './configure-tone-api';
import { store } from './store';

RNCallKeep.addEventListener('didDisplayIncomingCall', ({ error }) => {
  // you might want to do following things when receiving this event:
  // - Start playing ringback if it is an outgoing call
  console.log('RNCallkeep -> didDisplayIncomingCall');
});

RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
  console.log('RNCallkeep -> endCall');
  try {
    toneAPI.hangUp();
  } catch (error) {
    console.error(error);
  }
  if (isInBackground !== null) {
    console.log('App status: Not null');
    toneAPI.stopAgent();
    RNCallKeep.setAvailable(false);
  }
});

RNCallKeep.addEventListener('answerCall', () => {
  console.log('RNCallKeep -> AnswerCall from configureCallKeep');
  if (isInBackground) {
    const password = store.getState().auth.toneToken;
    toneAPI.authenticate('65246', password, false);
  } else {
    toneAPI.answer();
  }
});

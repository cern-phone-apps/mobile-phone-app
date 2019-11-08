import RNCallKeep from 'react-native-callkeep';

import { toneAPI } from './configure-tone-api';
import { store } from './store';
import { errorMessage, logMessage } from './src/common/utils/logging';

export default {
  ios: {
    appName: 'CERN Phone App'
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs access to your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok'
  }
};

export const addRNCallKeepListeners = () => {
  logMessage('configure-callkeep -> Adding callkeep listeners');
  /**
   * When displayIncomingCall is triggered, this is triggered (only on iOS?)
   */
  RNCallKeep.addEventListener('didDisplayIncomingCall', ({ error }) => {
    // you might want to do following things when receiving this event:
    // - Start playing ringback if it is an outgoing call
    logMessage('RNCallkeep -> didDisplayIncomingCall');
    if (error) {
      errorMessage(error);
    }
  });

  /**
   * This is triggered when the user taps the NATIVE endCall button
   */
  RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
    logMessage('RNCallkeep -> endCall');
    const { isInBackground } = store.getState().settings;

    try {
      toneAPI.hangUp();
      logMessage(`RNCallkeep -> endCall ${callUUID}`);
    } catch (error) {
      errorMessage(error);
    }
    if (isInBackground) {
      toneAPI.stopAgent();
      RNCallKeep.setAvailable(false);
    }
  });

  /**
   * This is triggered when the user taps the NATIVE answer button
   */
  RNCallKeep.addEventListener('answerCall', () => {
    const { isInBackground } = store.getState().settings;
    const { activeNumber } = store.getState().numbers;

    logMessage('RNCallKeep -> AnswerCall from configureCallKeep');
    logMessage(`RNCallKeep -> inBackground: ${isInBackground}`);
    if (isInBackground) {
      const password = store.getState().auth.toneToken;
      toneAPI.authenticate(activeNumber, password, false);
    } else {
      toneAPI.answer();
    }
  });
  return true;
};

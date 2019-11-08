import RNCallKeep from 'react-native-callkeep';
import { AppState } from 'react-native';

import { callActions } from 'dial-core';

import uuid4 from 'uuid/v4';
import { store, rehydration } from './store';
import { settingsActions } from './src/settings/actions/app-state';
import { logMessage, warnMessage } from './src/common/utils/logging';
import callKeepOptions, { addRNCallKeepListeners } from './configure-callkeep';

let callKeepListenersAdded;
if (!callKeepListenersAdded) {
  logMessage('Adding CallKeep Listeners...');
  callKeepListenersAdded = addRNCallKeepListeners();
}
/**
 * Asynchonous function that is run when the application receives a push notification.
 * It is registered on index.js
 */
export default async message => {
  // handle your message
  logMessage(
    `bgMessaging -> Receiving a background PUSH Notification (${message})`
  );

  /**
   * This will continue when rehydration is complete. If the store is already rehydrated,
   * it will continue immediately because the promise is already resolved. If rehydration failed, it will throw an exception
   */
  await rehydration();
  logMessage('Rehydration completed');

  try {
    RNCallKeep.setup(callKeepOptions);
    RNCallKeep.setAvailable(true);
  } catch (error) {
    warnMessage(error);
  }

  /**
   * Set the incoming call id to be used by RNCallkeep
   */
  const callId = uuid4();
  store.dispatch(callActions.setCallId(callId));
  /**
   * Set if the app is working on background or foreground.
   * This behaviour will affect the answer and hangUp functions behavior
   */
  const isInBackground = !!AppState.currentState.match(/inactive|background/);
  store.dispatch(settingsActions.setAppState(isInBackground));

  RNCallKeep.displayIncomingCall(
    callId,
    message.data.fromNumber,
    message.data.fromNumber
  );

  return Promise.resolve();
};

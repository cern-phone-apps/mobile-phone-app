import RNCallKeep from 'react-native-callkeep';
import { AppState } from 'react-native';

import { callActions } from 'dial-core';

import uuid4 from 'uuid/v4';
import { store } from './store';
import { settingsActions } from './src/settings/actions/app-state';
import { logMessage, warnMessage } from './src/common/utils/logging';
import callKeepOptions from './configure-callkeep';

/**
 * Asynchonous function that is run when the application receives a push notification.
 * It is registered on index.js
 */
export default async message => {
  // handle your message
  logMessage(
    `bgMessaging -> Receiving a background PUSH Notification (${message})`
  );
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

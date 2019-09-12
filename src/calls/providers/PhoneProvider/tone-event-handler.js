import RNCallKeep from 'react-native-callkeep';
import { Alert, Platform } from 'react-native';
import { connectionActions, callActions, recentCallsActions } from 'dial-core';
import {
  errorMessage,
  toneInMessage,
  logMessage,
  warnMessage
} from '../../../common/utils/logging';
import Sound from '../../utils/sound/Sound';

import { store } from '../../../../store';

/**
 *
 * @param {*} header
 * @param {*} message
 */
const displayErrorAlert = (header = 'Error', message) => {
  Alert.alert(header, message, [
    {
      text: 'Close',
      style: 'cancel'
    }
  ]);
};
/**
 * If we receive a terminated event, it can happen for the ongoing call or for the additional call.
 * If there are additional calls (more than 1 at the time) and there is a 'terminate' event.
 * - One of the calls has been removed.
 * - We need to determine which call was it: the ongoing call (the user hangup and answer the new call)
 *  or the new incoming call (the user rejected the call)
 */
const handleTerminatedEventWithAdditionalCalls = () => {
  const { additionalCalls, tempRemote, remote } = store.getState().call;

  if (additionalCalls > 0) {
    store.dispatch(callActions.decrementAdditionalCallsNumber());

    if (this.hangupDefault) {
      logMessage('Hanging up default call...');
      // We want to hangup the ongoing call
      store.dispatch(recentCallsActions.addRecentCall(remote));
      // We keep the additional call
      store.dispatch(callActions.setOngoingCallFinished());
      // This must be after addCallToRecentCalls
    } else {
      logMessage('Hanging up temp call');
      // We want to hangup the additionalCall
      logMessage(tempRemote);
      store.dispatch(recentCallsActions.addRecentCall(tempRemote));
      // We keep the remote
      store.dispatch(callActions.setTempCallFinished());
    }
  }
};
/**
 *
 */
const handleTerminatedEvent = () => {
  const { additionalCalls, tempRemote, remote, onCall } = store.getState().call;

  if (additionalCalls > 0) {
    // We need to handle the additionalCalls
    handleTerminatedEventWithAdditionalCalls();
  } else if (onCall) {
    // We handle the ongoing call
    store.dispatch(recentCallsActions.addRecentCall(remote));
    store.dispatch(callActions.setOngoingCallFinished());
    RNCallKeep.endCall(remote.callId);
  } else {
    // We handle the temp call
    store.dispatch(recentCallsActions.addRecentCall(tempRemote));
    store.dispatch(callActions.setTempCallFinished());
    RNCallKeep.endCall(tempRemote.callId);
  }
};
/**
 *
 */
const handleInviteReceivedWithAdditionalCalls = () => {
  const { onCall } = store.getState().call;
  if (onCall) {
    store.dispatch(callActions.incrementAdditionalCallsNumber());
  }
};
/**
 * When we receive an inviteReceivedEvent, we want to play a ringtone and
 * update the redux state
 * @param event
 */
const handleInviteReceivedEvent = (event, toneAPI) => {
  const { onCall } = store.getState().call;
  const { uri } = event.data.session.remoteIdentity;
  const currentCallId = toneAPI.getMostRecentSession().id;

  logMessage(`handleInviteReceivedEvent with onCall: ${onCall}`);
  logMessage(onCall);

  if (onCall) {
    handleInviteReceivedWithAdditionalCalls();
  }

  // Retrieve the remote user information from the event data
  store.dispatch(callActions.setIsReceivingCall(uri.user, null));
  store.dispatch(callActions.setCallId(currentCallId.toLowerCase()));

  RNCallKeep.displayIncomingCall(
    currentCallId.toLowerCase(),
    uri.user,
    uri.user
  );
};
/**
 * When we receive a disconnected event, we update the redux state
 */
const handleUnregisteredEvent = () => {
  store.dispatch(connectionActions.setDisconnectionSuccess());
};
/**
 *
 */
const handlRegistrationFailedEvent = () => {
  const errorToDisplay = {
    code: {
      status_code: 'UA-2-registration-failed'
    },
    description: `Unable to authenticate the user on TONE`
  };
  displayErrorAlert(
    errorToDisplay.code.status_code,
    errorToDisplay.description
  );

  store.dispatch(connectionActions.setRegistrationFailure(errorToDisplay));
};
/**
 * When the user connects to tone, we trigger a redux action to set the
 * state as connected
 */
const handleRegisteredEvent = () => {
  // const { setRegistrationSuccess } = this.props;
  // setRegistrationSuccess();
  // toneInMessage(store.getState());
  // const authToken = store.getState().auth.toneToken;
  // toneInMessage(authToken);
  toneInMessage('Calling handleRegisteredEvent');
  store.dispatch(connectionActions.setRegistrationSuccess());
  RNCallKeep.setAvailable(true);
};
/**
 *
 */
const handleRejectedEvent = () => {
  if (Platform.OS === 'ios') {
    Sound.stopRingbacktone();
    Sound.stopRingTone();
  }
  store.dispatch(callActions.setCallMissed());
};
const handleFailedEvent = () => {
  const tempFailedMessage = {
    code: {
      status_code: 'NI'
    },
    description: 'Call failed'
  };
  store.dispatch(callActions.setCallFailed(tempFailedMessage));
};
const handleProgressEvent = () => {
  // Sound.playRingbackTone();
  store.dispatch(callActions.setIsCalling(true));
};
const handleCancelEvent = () => {
  warnMessage('Cancel event triggered but doing nothing');
};
const handleAcceptedEvent = () => {
  if (Platform.OS === 'ios') {
    Sound.stopRingbacktone();
    Sound.stopRingTone();
  }
  store.dispatch(callActions.setCallAccepted());
  RNCallKeep.setCurrentCallActive();
};
/**
 * =======
 * EVENTS
 * =======
 */
const eventHandler = (event, toneAPI) => {
  toneInMessage(`Tone Event received: ${event.name}`);
  toneInMessage(event);

  const handler = {
    registered: handleRegisteredEvent,
    registrationFailed: handlRegistrationFailedEvent,
    unregistered: handleUnregisteredEvent,
    terminated: handleTerminatedEvent,
    accepted: handleAcceptedEvent,
    rejected: handleRejectedEvent,
    inviteReceived: handleInviteReceivedEvent,
    failed: handleFailedEvent,
    progress: handleProgressEvent,
    cancel: handleCancelEvent
  }[event.name];

  if (handler) {
    handler(event, toneAPI);
  } else {
    errorMessage(`Unhandled event: ${event.name}`);
  }
};

export default eventHandler;

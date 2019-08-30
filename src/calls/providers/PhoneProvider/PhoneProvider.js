import React, { Children } from 'react';
import { Platform, Alert } from 'react-native';

import PropTypes from 'prop-types';
import { Dial } from 'tone-api-mobile';

import RNCallKeep from 'react-native-callkeep';
import uuid4 from 'uuid/v4';
import Sound from '../../utils/sound/Sound';

import {
  errorMessage,
  logMessage,
  toneInMessage,
  toneOutMessage
} from '../../../common/utils/logging';

const displayErrorAlert = (header = 'Error', message) => {
  Alert.alert(header, message, [
    {
      text: 'Close',
      style: 'cancel'
    }
  ]);
};

const options = {
  ios: {
    appName: 'CERN Phone App'
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok'
  }
};

export class PhoneProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // tokens
    authToken: PropTypes.string,
    toneToken: PropTypes.string.isRequired,
    // call info
    call: PropTypes.shape({
      remote: PropTypes.shape({
        callId: PropTypes.string
      }),
      tempRemote: PropTypes.shape({
        callId: PropTypes.string
      }),
      startTime: PropTypes.number,
      onCall: PropTypes.bool,
      additionalCalls: PropTypes.number.isRequired
    }),
    // state setters
    setToneToken: PropTypes.func.isRequired,
    setRegistrationSuccess: PropTypes.func.isRequired,
    setIsCalling: PropTypes.func.isRequired,
    setIsReceivingCall: PropTypes.func.isRequired,
    setCallFailed: PropTypes.func.isRequired,
    setCallMissed: PropTypes.func.isRequired,
    setCallAccepted: PropTypes.func.isRequired,
    setMakeCallRequest: PropTypes.func.isRequired,
    setDisconnectionSuccess: PropTypes.func.isRequired,
    // actions
    requestRegistration: PropTypes.func.isRequired,
    requestDisconnection: PropTypes.func.isRequired,
    addRecentCall: PropTypes.func.isRequired,
    clearAuthToken: PropTypes.func.isRequired,
    setRegistrationFailure: PropTypes.func.isRequired,
    setTempCallFinished: PropTypes.func.isRequired,
    setOngoingCallFinished: PropTypes.func.isRequired,
    incrementAdditionalCallsNumber: PropTypes.func.isRequired,
    decrementAdditionalCallsNumber: PropTypes.func.isRequired,
    setCallId: PropTypes.func.isRequired
  };

  static defaultProps = {
    call: {},
    authToken: null
  };

  state = {
    phoneService: this
  };

  static childContextTypes = {
    phoneService: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired,
      makeCall: PropTypes.func.isRequired
    }).isRequired
  };

  getChildContext() {
    const { phoneService } = this.state;
    return { phoneService };
  }

  /**
   * Class functionality
   */

  /**
   * When the component is mounted we load Dial
   */
  componentDidMount() {
    const { authToken } = this.props;

    const firstRegister = !!authToken;
    const devMode = false;

    RNCallKeep.setup(options);
    this.setState(
      {
        toneAPI: new Dial(devMode, firstRegister)
      },
      () => {
        this.addListeners();
        RNCallKeep.addEventListener(
          'didReceiveStartCallAction',
          this.onNativeCall
        );
        RNCallKeep.addEventListener('answerCall', () => {
          logMessage('Received answerCall event');
          this.acceptToneCall();
        });
        //RNCallKeep.addEventListener('endCall', this.hangUpCurrentCallAction);
        RNCallKeep.addEventListener(
          'didDisplayIncomingCall',
          this.onIncomingCallDisplayed
        );
      }
    );
  }

  addListeners = () => {
    const { toneAPI } = this.state;
    this.notifier = toneAPI.getNotifier();
    if (this.notifier) {
      this.notifier.on('ToneEvent', event => {
        this.eventHandler(event);
      });
    }
  };

  getCurrentCallId = () => {
    if (!this.currentCallId) {
      this.currentCallId = uuid4();
    }

    return this.currentCallId;
  };

  /**
   * Authenticates the user using the Telephony API
   * @param phoneNumber
   * @returns {boolean|void|*}
   */
  authenticateUser = username => {
    const {
      authToken,
      toneToken,
      requestRegistration,
      setToneToken,
      clearAuthToken,
      setRegistrationFailure
    } = this.props;
    const { toneAPI } = this.state;

    toneOutMessage(`Authenticating user: ${username}/*****`);
    requestRegistration();
    /**
     * If there is an authToken, we use that token. Else, we use the already encrypted token provided by the api
     */
    let tempToken;
    if (authToken) {
      tempToken = authToken;
    } else {
      tempToken = toneToken;
    }
    try {
      const eToken = toneAPI.authenticate(username, tempToken);
      if (authToken) {
        /**
         * If the authToken was used, we clear the original auth token as we will use the encrypted token from now on.
         */
        clearAuthToken();
        setToneToken(eToken);
      }
    } catch (error) {
      errorMessage(`Unable to authenticate the user`);
      errorMessage(error);

      const errorToDisplay = {
        code: {
          status_code: 'UA-1'
        },
        description: `Unable to authenticate the user on TONE`
      };

      setRegistrationFailure(errorToDisplay);
      // logout();
    }
  };

  disconnectUser = async () => {
    const {
      requestDisconnection,
      setDisconnectionSuccess,
      call: { onCall }
    } = this.props;
    const { toneAPI } = this.state;

    toneOutMessage(`UnAuthenticating user`);

    if (onCall === true) {
      logMessage('Hanging up current call');
      this.hangUpCurrentCallAction();
    }
    await requestDisconnection(true);

    try {
      toneAPI.stopAgent();
    } catch (error) {
      errorMessage(`Agent is not connected`);
      setDisconnectionSuccess();
    }
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = (name = 'Unknown', phoneNumber) => {
    const { setMakeCallRequest, setIsCalling, setCallId } = this.props;
    const { toneAPI } = this.state;

    logMessage('makeCall has been called');
    setMakeCallRequest({
      name,
      phoneNumber
    });
    setIsCalling();
    const callSessionId = toneAPI.call(phoneNumber);
    setCallId(callSessionId);
    RNCallKeep.startCall(callSessionId, phoneNumber);
  };

  onNativeCall = ({ handle }) => {
    this.makeCall(handle, handle);
  };

  hangUpCurrentCallAction = (hangupDefault = false) => {
    const { toneAPI } = this.state;
    toneOutMessage(`Hang up current call from hangUpCurrentCallAction`);
    if (hangupDefault) {
      this.hangupDefault = true;
      logMessage('hangupDefault is true');
    }
    try {
      toneAPI.hangUp();
    } catch (error) {
      console.error(error);
    }
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const {
      setTempCallFinished,
      call: { onCall },
      setOngoingCallFinished
    } = this.props;
    // logEvent("calls", `hangUp`, `remote: ${username}.`);
    if (onCall) {
      setOngoingCallFinished();
    } else {
      setTempCallFinished();
    }
  };

  sendDtmfCommand = tone => {
    const { toneAPI } = this.state;
    toneAPI.sendDTMF(tone);
  };

  receiveCall = ({ callerNumber, callerName }) => {
    const { setIsReceivingCall } = this.props;
    logMessage('Is receiving call');
    // Sound.playRingTone();
    setIsReceivingCall(callerNumber, callerName);
  };

  /**
   * Method that must be called when an incoming call is rejected.
   * It performs all the actions needed by this action.
   */
  rejectIncomingCall = () => {
    const { call: tempRemote } = this.props;
    const { toneAPI } = this.state;
    logMessage('PhoneProvider -> rejectIncomingCall');
    RNCallKeep.endCall(tempRemote.callId);
    try {
      toneAPI.hangUp();
    } catch (error) {
      console.log(error);
    }
  };

  acceptToneCall = () => {
    const { toneAPI } = this.state;
    toneOutMessage(`Accepting incoming call`);
    toneAPI.answer();
  };

  acceptIncomingCall = () => {
    this.acceptToneCall();
    RNCallKeep.setCurrentCallActive();
  };

  /**
   * When the user connects to tone, we trigger a redux action to set the
   * state as connected
   */
  handleRegisteredEvent = () => {
    const { setRegistrationSuccess } = this.props;
    setRegistrationSuccess();
    RNCallKeep.setAvailable(true);
  };

  /**
   * When we receive a disconnected event, we update the redux state
   */
  handleUnregisteredEvent = () => {
    const { setDisconnectionSuccess } = this.props;
    setDisconnectionSuccess();
  };

  handleRegistationFailedEvent = event => {
    const { setRegistrationFailure } = this.props;
    if (event.error !== undefined) {
      setRegistrationFailure(event.error);
    }
  };

  /**
   * Logs the user out of TONE
   */
  unAuthenticateUser = () => {
    const {
      requestDisconnection,
      call: onCall,
      setOngoingCallFinished
    } = this.props;
    const { toneAPI } = this.state;
    toneOutMessage(`UnAuthenticating user`);

    if (onCall) {
      setOngoingCallFinished();
    }
    requestDisconnection(true);
    try {
      toneAPI.stopAgent();
    } catch (error) {
      errorMessage(error);
    }
  };

  handleInviteReceivedWithAdditionalCalls = () => {
    const {
      call: { onCall },
      incrementAdditionalCallsNumber
    } = this.props;
    if (onCall) {
      incrementAdditionalCallsNumber();
    }
  };

  /**
   * If we receive a terminated event, it can happen for the ongoing call or for the additional call.
   * If there are additional calls (more than 1 at the time) and there is a 'terminate' event.
   * - One of the calls has been removed.
   * - We need to determine which call was it: the ongoing call (the user hangup and answer the new call)
   *  or the new incoming call (the user rejected the call)
   */
  handleTerminatedEventWithAdditionalCalls = () => {
    const {
      setTempCallFinished,
      addRecentCall,
      setOngoingCallFinished,
      call: { additionalCalls, remote, tempRemote },
      decrementAdditionalCallsNumber
    } = this.props;

    if (additionalCalls > 0) {
      decrementAdditionalCallsNumber();

      if (this.hangupDefault) {
        logMessage('Hanging up default call...');
        // We want to hangup the ongoing call
        addRecentCall(remote);
        // We keep the additional call
        setOngoingCallFinished();
        // This must be after addCallToRecentCalls
        this.hangupDefault = false;
      } else {
        logMessage('Hanging up temp call');
        // We want to hangup the additionalCall
        logMessage(tempRemote);
        addRecentCall(tempRemote);
        // We keep the remote
        setTempCallFinished();
      }
    }
  };

  handleTerminatedEvent = () => {
    const {
      addRecentCall,
      setTempCallFinished,
      setOngoingCallFinished,
      call: { additionalCalls, tempRemote, remote, onCall }
    } = this.props;

    if (additionalCalls > 0) {
      // We need to handle the additionalCalls
      this.handleTerminatedEventWithAdditionalCalls();
    } else if (onCall) {
      // We handle the ongoing call
      addRecentCall(remote);
      setOngoingCallFinished();
      RNCallKeep.endCall(remote.callId);
    } else {
      // We handle the temp call
      addRecentCall(tempRemote);
      setTempCallFinished();
      RNCallKeep.endCall(tempRemote.callId);
    }
  };

  /**
   * When we receive an inviteReceivedEvent, we want to play a ringtone and
   * update the redux state
   * @param event
   */
  handleInviteReceivedEvent = event => {
    const {
      setIsReceivingCall,
      call: { onCall },
      setCallId
    } = this.props;
    const { toneAPI } = this.state;
    logMessage(`handleInviteReceivedEvent with onCall: ${onCall}`);
    logMessage(onCall);
    if (onCall) {
      this.handleInviteReceivedWithAdditionalCalls();
    }
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    setIsReceivingCall(uri.user, null);
    setCallId(toneAPI.getMostRecentSession().id);
    RNCallKeep.displayIncomingCall(this.getCurrentCallId(), uri.user);
  };

  handleRejectedEvent = () => {
    const { setCallMissed } = this.props;
    if (Platform.OS === 'ios') {
      Sound.stopRingbacktone();
      Sound.stopRingTone();
    }
    setCallMissed();
  };

  handleAcceptedEvent = () => {
    const { setCallAccepted } = this.props;
    if (Platform.OS === 'ios') {
      Sound.stopRingbacktone();
      Sound.stopRingTone();
    }
    setCallAccepted();
    RNCallKeep.setCurrentCallActive();
  };

  handleFailedEvent = () => {
    const { setCallFailed } = this.props;
    const tempFailedMessage = {
      code: {
        status_code: 'NI'
      },
      description: 'Call failed'
    };
    setCallFailed(tempFailedMessage);
  };

  testFunction = () => {
    console.log('Hello World');
  };

  handleProgressEvent = () => {
    const { setIsCalling } = this.props;
    // Sound.playRingbackTone();
    setIsCalling(true);
  };

  handleCancelEvent = () => {
    console.warn('Cancel event triggered but doing nothing');
  };

  handleRegistrationFailedEvent = () => {
    displayErrorAlert(
      'Error',
      'Unable to register the selected number. Please, logout and try again in a few minutes.'
    );
  };

  onIncomingCallDisplayed = () => {
    logMessage('Calling onIncomingCallDisplayed');
    // You will get this event after RNCallKeep finishes showing incoming call UI
    // You can check if there was an error while displaying
  };

  handlRegistrationFailedEvent = () => {
    const { setRegistrationFailure } = this.props;
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

   setRegistrationFailure(errorToDisplay);
  };

  /**
   * =======
   * EVENTS
   * =======
   */

  eventHandler = event => {
    toneInMessage(`Tone Event received: ${event.name}`);
    toneInMessage(event);

    const handler = {
      registered: this.handleRegisteredEvent,
      registrationFailed: this.handlRegistrationFailedEvent,
      unregistered: this.handleUnregisteredEvent,
      terminated: this.handleTerminatedEvent,
      accepted: this.handleAcceptedEvent,
      rejected: this.handleRejectedEvent,
      inviteReceived: this.handleInviteReceivedEvent,
      failed: this.handleFailedEvent,
      progress: this.handleProgressEvent,
      cancel: this.handleCancelEvent
    }[event.name];

    if (handler) {
      handler(event);
    } else {
      errorMessage(`Unhandled event: ${event.name}`);
    }
  };

  render() {
    const { children } = this.props;
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(children);
  }
}

export default PhoneProvider;

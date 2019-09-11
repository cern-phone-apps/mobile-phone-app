import React, { Children } from 'react';
import { Platform, Alert } from 'react-native';

import PropTypes from 'prop-types';
import { Dial } from 'tone-api-mobile';

import RNCallKeep from 'react-native-callkeep';
import uuid4 from 'uuid/v4';
import Sound from '../../utils/sound/Sound';
import eventHandler from './tone-event-handler';

import {
  errorMessage,
  warnMessage,
  logMessage,
  toneOutMessage
} from '../../../common/utils/logging';

// TODO REMOVE
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
    this.initializeToneApi();
  }

  initializeToneApi = () => {
    const devMode = false;

    RNCallKeep.setup(options);
    this.setState(
      {
        toneAPI: new Dial(devMode)
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
        RNCallKeep.addEventListener('endCall', this.hangUpCurrentCallAction);
        RNCallKeep.addEventListener(
          'didDisplayIncomingCall',
          this.onIncomingCallDisplayed
        );
      }
    );
  };

  addListeners = () => {
    const { toneAPI } = this.state;
    this.notifier = toneAPI.getNotifier();
    if (this.notifier) {
      this.notifier.on('ToneEvent', event => {
        eventHandler(event, toneAPI);
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
      const eToken = toneAPI.authenticate(username, tempToken, !!authToken);
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
      logMessage(error);
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
      logMessage(error);
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

  testFunction = () => {
    logMessage('Hello World');
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

  render() {
    const { children } = this.props;
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(children);
  }
}

export default PhoneProvider;

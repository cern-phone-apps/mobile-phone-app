import RNCallKeep from 'react-native-callkeep';
import { Dial } from 'tone-api-mobile';

const options = {
  ios: {
    appName: 'CERN Phone App',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
  },
};

const eventHandler = (event) => {
  console.log(`Tone Event received: ${event.name}`);
  console.log(event);

  const handler = {
    //   registered: this.handleRegisteredEvent,
    //   registrationFailed: this.handlRegistrationFailedEvent,
    //   unregistered: this.handleUnregisteredEvent,
    //   terminated: this.handleTerminatedEvent,
    //   accepted: this.handleAcceptedEvent,
    //   rejected: this.handleRejectedEvent,
    //   inviteReceived: this.handleInviteReceivedEvent,
    //   failed: this.handleFailedEvent,
    //   progress: this.handleProgressEvent,
    //   cancel: this.handleCancelEvent,
  }[event.name];

  if (handler) {
    handler(event);
  } else {
    console.warn(`Unhandled event: ${event.name}`);
  }
};

export default async (store, message) => {
  // handle your message
  console.log('Receiving a background PUSH Notification');
  console.log(message);
  store.subscribe(() => {
    const authToken = store.getState().auth.toneToken;

    if (authToken) {
      const firstRegister = !!authToken;
      const devMode = false;
      const number = '65246';
      const tempToken = authToken;

      // RNCallKeep.setup(options);

      const toneApi = new Dial(devMode);
      console.log(number);
      toneApi.authenticate(number, tempToken, firstRegister);

      const notifier = toneApi.getNotifier();
      if (notifier) {
        notifier.on('ToneEvent', (event) => {
          eventHandler(event);
        });
      }
    } else {
      console.log('authToken is not defined');
    }
  });

  return Promise.resolve();
};

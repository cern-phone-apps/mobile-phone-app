import RNCallKeep from 'react-native-callkeep';
import { Dial } from 'tone-api-mobile';

import eventHandler from './src/calls/providers/PhoneProvider/tone-event-handler';

export default async (store, message) => {
  // handle your message
  console.log('Receiving a background PUSH Notification');
  console.log(message);
  let times = 0;

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
  const devMode = false;
  const toneAPI = new Dial(devMode);

  RNCallKeep.setup(options);
  RNCallKeep.setAvailable(true);

  RNCallKeep.addEventListener('answerCall', () => {
    console.log('Received answerCall event');
    toneAPI.answer();
  });

  const notifier = toneAPI.getNotifier();
  if (notifier) {
    notifier.on('ToneEvent', event => {
      eventHandler(event, toneAPI);
    });
  }

  store.subscribe(() => {
    if (times === 0) {
      times += 1;
      console.log(store.getState());
      const authToken = store.getState().auth.toneToken;

      if (authToken) {
        const firstRegister = !!authToken;
        const number = '65891';
        const tempToken = authToken;

        console.log(number);
        toneAPI.authenticate(number, tempToken, firstRegister);
      } else {
        console.log('authToken is not defined');
      }
    } else {
      console.error('DONE ANOTHER TIME');
    }
  });
  // });

  return Promise.resolve();
};

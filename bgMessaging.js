import firebase from 'react-native-firebase';
import {RemoteMessage} from 'react-native-firebase';

export default async (store, message) => {
  // handle your message
  console.log('Receiving a background PUSH Notification');
  console.log(message);
  store.subscribe(() => {
    console.log(store.getState().auth);
  });

  return Promise.resolve();
};

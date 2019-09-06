import firebase from 'react-native-firebase';
import { RemoteMessage } from 'react-native-firebase';

export default async message => {
  // handle your message
  console.log('Receiving a background PUSH Notification');
  console.log(JSON.stringify(message));

  return Promise.resolve();
};

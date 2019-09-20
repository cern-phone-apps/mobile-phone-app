import RNCallKeep from 'react-native-callkeep';
import uuid4 from 'uuid/v4';

export default async message => {
  // handle your message
  console.log('Receiving a background PUSH Notification');
  console.log(message);
  let times = 0;

  const devMode = false;
  let uuidToken = uuid4();

  RNCallKeep.displayIncomingCall(
    uuidToken,
    message.data.fromNumber,
    message.data.fromNumber
  );

  return Promise.resolve();
};

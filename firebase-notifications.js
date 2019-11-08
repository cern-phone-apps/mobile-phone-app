import firebase from 'react-native-firebase';
import { logMessage } from './src/common/utils/logging';

class FirebaseNotifications {
  static async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      // User has rejected permissions
      logMessage('permission rejected');
    }
  }

  // 1
  static async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      FirebaseNotifications.requestPermission();
    }
    return enabled;
  }
}

export default FirebaseNotifications;

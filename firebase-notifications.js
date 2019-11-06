import firebase from 'react-native-firebase';
import { showMessage } from 'react-native-flash-message';
import { infoMessage, logMessage } from './src/common/utils/logging';

class FirebaseNotifications {
  static notificationListener;

  static notificationOpenedListener;

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

  static async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    FirebaseNotifications.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        FirebaseNotifications.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    FirebaseNotifications.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        FirebaseNotifications.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      FirebaseNotifications.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      // process data message
      infoMessage(
        'Receiving a PUSH notification. App on foreground. BUT DOING NOTHING'
      );
      logMessage(JSON.stringify(message));
    });
  }

  static showAlert(title, body) {
    showMessage({
      message: title,
      description: body,
      type: 'default',
      duration: 3000
    });
  }
}

export default FirebaseNotifications;

import { Alert } from "react-native";
import firebase from "react-native-firebase";

class FirebaseNotifications {
  static notificationListener;

  static notificationOpenedListener;

  static async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  // 1
  static async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      FirebaseNotifications.requestPermission();
    }
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
      console.log(JSON.stringify(message));
    });
  }

  static showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
}

export default FirebaseNotifications;

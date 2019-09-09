/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import FlashMessage from 'react-native-flash-message';
import firebase from 'react-native-firebase';
import { name as appName } from './app.json';
import App from './App';
import configureStore from './store';
import FirebaseNotifications from './firebase-notifications';
import bgMessaging from './bgMessaging'; // <-- Import the file you created in (2)

import PhoneProvider from './src/calls/providers/PhoneProvider/PhoneProviderContainer';

console.disableYellowBox = true;
/**
 * Set up the store and the history
 */
const { store, persistor } = configureStore();

const LoadingComponent = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const getFirebaseDeviceToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
    // user has a device token
  } else {
    console.log('No FCM token');
    // user doesn't have a device token yet
  }
};

const PhoneMobile = () => {
  useEffect(() => {
    if (FirebaseNotifications.checkPermission()) {
      getFirebaseDeviceToken();
    }
    FirebaseNotifications.createNotificationListeners();

    return () => {
      FirebaseNotifications.notificationListener();
      FirebaseNotifications.notificationOpenedListener();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <PhoneProvider>
          <App />
        </PhoneProvider>
      </PersistGate>
      <FlashMessage position="top" />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => PhoneMobile);

// Background behavior
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () =>
  bgMessaging.bind(null, store),
);

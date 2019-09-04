/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import FlashMessage from 'react-native-flash-message';
import firebase from 'react-native-firebase';
import { name as appName } from './app.json';
import App from './App';
import configureStore from './store';
import FirebaseNotifications from './firebase-notifications';

import PhoneProvider from './src/calls/providers/PhoneProvider/PhoneProviderContainer';

console.disableYellowBox = true;
/**
 * Set up the store and the history
 */
const { store, persistor } = configureStore();

// const iosConfig = {
//   clientId: 'x',
//   appId: 'x',
//   apiKey: 'x',
//   databaseURL: 'x',
//   storageBucket: 'x',
//   messagingSenderId: 'x',
//   projectId: 'x',

//   // enable persistence by adding the below flag
//   persistence: true,
// };

// // pluck values from your `google-services.json` file you created on the firebase console
// const androidConfig = {
//   clientId: 'x',
//   appId: 'x',
//   apiKey: 'AIzaSyAL8j5kXy2QInAOdHZXZujAu-Ci-kLlabQ',
//   databaseURL: 'x',
//   storageBucket: 'x',
//   messagingSenderId: 'x',
//   projectId: 'rene-test-project',

//   // enable persistence by adding the below flag
//   persistence: true,
// };

// const kittensApp = firebase.initializeApp(
//   // use platform specific firebase config
//   Platform.OS === 'ios' ? iosConfig : androidConfig,
//   // name of this app
//   'kittens'
// );

const LoadingComponent = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const PhoneMobile = () => {
  useEffect(() => {
    FirebaseNotifications.checkPermission();
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

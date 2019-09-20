/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, View, Text } from 'react-native';
import RNCallKeep from 'react-native-callkeep';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  MediaStream,
  mediaDevices
} from 'react-native-webrtc';
import firebase from 'react-native-firebase';

import FlashMessage from 'react-native-flash-message';
import FirebaseNotifications from './firebase-notifications';
import bgMessaging from './bgMessaging';

import { name as appName } from './app.json';
import App from './App';
import { store, persistor } from './store';
import PhoneProviderContainer from './src/calls/providers/PhoneProvider/PhoneProviderContainer';

import { toneAPI } from './configure-tone-api';
import './configure-callkeep';

// Polyfill WebRTC
global.MediaStream = MediaStream;
global.RTCSessionDescription = RTCSessionDescription;
global.RTCPeerConnection = RTCPeerConnection;
global.navigator = {};
global.navigator.mediaDevices = mediaDevices;

// eslint-disable-next-line no-console
console.disableYellowBox = true;
/**
 * Set up the store and the history
 */

const LoadingComponent = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const PhoneMobile = () => {
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

  useEffect(() => {
    if (FirebaseNotifications.checkPermission()) {
      getFirebaseDeviceToken();
    }
    FirebaseNotifications.createNotificationListeners();

    const options = {
      ios: {
        appName: 'CERN Phone App'
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription:
          'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok'
      }
    };
    RNCallKeep.setup(options);

    return () => {
      FirebaseNotifications.notificationListener();
      FirebaseNotifications.notificationOpenedListener();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <PhoneProviderContainer toneAPI={toneAPI}>
          <App />
        </PhoneProviderContainer>
      </PersistGate>
      <FlashMessage position="top" />
    </Provider>
  );
};
// Foreground behavior
AppRegistry.registerComponent(appName, () => PhoneMobile);

// Background behavior
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
);

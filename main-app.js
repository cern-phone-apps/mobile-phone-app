/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { View, AppState, ActivityIndicator, StatusBar } from 'react-native';
import RNCallKeep from 'react-native-callkeep';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { registerGlobals } from 'react-native-webrtc';
import firebase from 'react-native-firebase';

import FlashMessage from 'react-native-flash-message';
import FirebaseNotifications from './firebase-notifications';

import App from './App';
import { store, persistor } from './store';
import PhoneProviderContainer from './src/calls/providers/PhoneProvider/PhoneProviderContainer';
import { settingsActions } from './src/settings/actions/app-state';

import { toneAPI } from './configure-tone-api';
import callKeepOptions from './configure-callkeep';
import { logMessage, warnMessage } from './src/common/utils/logging';

/**
 * We initialize the webrtc capabilities here in order to import them directly on React Native.
 * These are used in the Tone JS API Session Description Handler
 */
// Polyfill WebRTC
registerGlobals();
/**
 * We are not displaying warnings in the app itself
 */
// eslint-disable-next-line no-console
console.disableYellowBox = true;

/**
 * This component is displayed when the store has not been rehydrated yet
 */
const LoadingComponent = () => {
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

/**
 * Main Class
 */
const PhoneMobile = () => {
  useEffect(() => {
    /**
     * Obtains the Firebase token to receive push notifications.
     * TODO: Save the token in the backend
     */
    const getFirebaseDeviceToken = async () => {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        logMessage(`Firebase device token: ${fcmToken}`);
        // user has a device token
      } else {
        warnMessage('No FCM token');
        // user doesn't have a device token yet
      }
    };

    /**
     * The the application to work on the foreground
     */
    const isInBackground = !!AppState.currentState.match(/inactive|background/);
    store.dispatch(settingsActions.setAppState(isInBackground));

    if (FirebaseNotifications.checkPermission()) {
      getFirebaseDeviceToken();
    }
    RNCallKeep.setup(callKeepOptions);
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

export default PhoneMobile;

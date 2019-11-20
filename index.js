/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { AppRegistry } from 'react-native';

import { registerGlobals } from 'react-native-webrtc';
import bgMessaging from './bgMessaging';

import { name as appName } from './app.json';

import PhoneMobile from './main-app';
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

// Foreground behavior
AppRegistry.registerComponent(appName, () => PhoneMobile);

// Background behavior
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
);

AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () => ({ name, callUUID, handle }) => {
    // Make your call here

    return Promise.resolve();
  }
);

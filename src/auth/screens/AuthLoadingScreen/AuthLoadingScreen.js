import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar, View, PermissionsAndroid } from 'react-native';

/**
 * Check if the user is logged in and redirect him to the correct screen
 */
export class AuthLoadingScreen extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    getMe: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.redirectToApp();
  }

  // Fetch the token from storage then navigate to our appropriate place
  redirectToApp = async () => {
    const { loggedIn, navigation, getMe } = this.props;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (loggedIn) {
      console.log('Obtaining user information');
      getMe();
    }
    navigation.navigate(loggedIn ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
      PermissionsAndroid.PERMISSIONS.ADD_VOICEMAIL,
      PermissionsAndroid.PERMISSIONS.USE_SIP,
      PermissionsAndroid.PERMISSIONS.PROCESS_OUTGOING_CALLS,
      PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
      PermissionsAndroid.PERMISSIONS.RECEIVE_MMS,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ]);
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;

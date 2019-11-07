import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { logMessage } from '../../../common/utils/logging';

const RegisterLoadingScreen = ({ connected, calling, onCall, navigation }) => {
  // Fetch the token from storage then navigate to our appropriate place
  const handleRegistration = () => {
    // const userToken = await AsyncStorage.getItem("userToken");
    logMessage(`RegisterLoadingScreen ->  connected? ${connected}`);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (onCall || calling) {
      logMessage('RegisterLoadingScreen -> Redirect to CallModal');
      navigation.navigate('CallModal');
      return;
    }
    navigation.navigate(connected ? 'AppRegistered' : 'Register');
  };

  useEffect(() => {
    logMessage('RegisterLoadingScreen -> handleRegistration()');
    handleRegistration();
  }, [connected, calling, onCall]);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

RegisterLoadingScreen.propTypes = {
  connected: PropTypes.bool.isRequired
};

export default RegisterLoadingScreen;

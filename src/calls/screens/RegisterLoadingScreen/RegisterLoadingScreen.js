import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { logMessage } from '../../../common/utils/logging';

const RegisterLoadingScreen = ({ connected, navigation }) => {
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem("userToken");
    logMessage('REGISTER LOADING: connected');
    logMessage(connected);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(connected ? 'AppRegistered' : 'Register');
  };

  useEffect(() => {
    bootstrapAsync();
    console.log('Running useEffect -> bootstrapAsync()');
  }, [connected]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Text>register loading screen</Text>
      <ActivityIndicator size="large" />
      <StatusBar barStyle="default" />
    </View>
  );
};

RegisterLoadingScreen.propTypes = {
  connected: PropTypes.bool.isRequired
};

export default RegisterLoadingScreen;

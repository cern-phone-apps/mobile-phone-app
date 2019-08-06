import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Dimensions, View, Image, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Toast } from '../../../common/components/android';
import cernLogo from '../../../../assets/assets_CERN-logo_outline.png';
import ColorPalette from '../../../styles/ColorPalette';

function LoginScreen({
  loggedIn,
  navigation,
  authInProgress,
  error,
  startAuth
}) {
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('App');
    }
  }, [loggedIn]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: Dimensions.get('window').height - 80,
        backgroundColor: 'white'
      }}
    >
      <Image
        source={cernLogo}
        resizeMode="contain"
        style={{
          height: 100,
          alignSelf: 'center'
        }}
      />
      {!authInProgress && (
        <Card title="CERN Phone">
          <Text
            style={{
              textAlign: 'center',
              paddingBottom: 10
            }}
          >
            SignIn with your CERN account to access the CERN Phone app.
          </Text>
          <Button
            buttonStyle={{
              backgroundColor: ColorPalette.primary
            }}
            onPress={() => {
              if (!authInProgress) {
                startAuth();
                console.log('Navigating to LoginWebView');
                navigation.navigate('LoginWebView');
              }
            }}
            title="Sign in"
          />
        </Card>
      )}
      {authInProgress && <ActivityIndicator size="large" />}
      {error && <Toast message={`Sign in failed: ${error.message}`} />}
    </View>
  );
}

LoginScreen.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  authInProgress: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  startAuth: PropTypes.func.isRequired
};

LoginScreen.defaultProps = {
  error: null,
  authInProgress: false
};

export default LoginScreen;

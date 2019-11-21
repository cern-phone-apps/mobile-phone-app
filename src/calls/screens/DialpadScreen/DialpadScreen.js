import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Alert } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import MakeCallForm from '../../components/DialpadForm/DialpadForm';

import CallForwardingBannerContainer from '../../components/CallForwarding/CallForwardingBannerContainer';
import ColorPalette from '../../../styles/ColorPalette';
import { phoneService } from '../../providers/PhoneProvider/PhoneService';
import { logMessage } from '../../../common/utils/logging';
import useCallStatus from '../../hooks/use-call-status';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  makeCallForm: {
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: 1 }],
    paddingBottom: 10
  }
});

const DialpadScreen = ({
  disabled,
  connected,
  activeNumber,
  getCallForwardingStatus
}) => {
  /**
   * Redirect to RegisterLoading if any of these statuses change
   */
  useCallStatus();
  /**
   * Update the call forwarding status
   */
  useEffect(() => {
    const miliSeconds = 60000;
    const timer = setInterval(() => {
      try {
        getCallForwardingStatus(activeNumber);
      } catch {
        logMessage('Get callforwarding status failed');
      }
    }, miliSeconds);
    logMessage('Running useEffect -> DialpadScreen()');
    return function cleanup() {
      clearInterval(timer);
    };
  }, [connected]);

  return (
    <View style={styles.container}>
      <CallForwardingBannerContainer />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            padding: 5,
            paddingHorizontal: 10,
            backgroundColor: ColorPalette.callBtnGreen,
            borderRadius: 10,
            color: 'white',
            overflow: 'hidden'
          }}
          onPress={() =>
            Alert.alert(
              'Switch number',
              'Do you really want to switch numbers ?',
              [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel'
                },
                {
                  text: 'Yes',
                  onPress: () => navigation.navigate('SwitchNumbers')
                }
              ],
              { cancelable: false }
            )
          }
        >
          {activeNumber}
        </Text>
      </View>
      <View style={styles.makeCallForm}>
        <MakeCallForm disabled={disabled} />
      </View>
    </View>
  );
};

DialpadScreen.propTypes = {
  disabled: PropTypes.bool,
  connected: PropTypes.bool.isRequired,
  tempRemote: PropTypes.shape({
    phoneNumber: PropTypes.string
  }),
  activeNumber: PropTypes.string.isRequired,
  getCallForwardingStatus: PropTypes.func.isRequired
};

DialpadScreen.defaultProps = {
  disabled: false,
  tempRemote: {}
};

export default withNavigation(phoneService(DialpadScreen));

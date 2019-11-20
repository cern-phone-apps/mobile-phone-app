import { View, Button, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import HangupButton from '../../components/HangupButton/HangupButton';
import OnCallInfoContainer from '../../components/OnCallInfo/OnCallInfoContainer';

const callingStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  },
  iconTextContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

/**
 * This screen is displayed when there there is an ongoing call or calling
 * @param {*} param0
 */
function CallModalScreen({ onCall, calling, tempRemote, navigation }) {
  /**
   * Redirect to RegisterLoading if any of these statuses change
   */
  useEffect(() => {
    if (!onCall && !calling) {
      navigation.navigate('RegisterLoading');
    }
  }, [onCall, calling, navigation]);

  if (onCall) {
    return <OnCallInfoContainer />;
  }

  if (calling) {
    return (
      <View style={[callingStyles.container]}>
        <View style={[callingStyles.iconTextContainer]}>
          <Text h2>Calling...</Text>
        </View>
        <View style={[callingStyles.iconTextContainer]}>
          <Icon name="phone" size={30} />
          <Text h4>{tempRemote.phoneNumber}</Text>
        </View>
        <HangupButton />
      </View>
    );
  }

  return null;
}

CallModalScreen.propTypes = {
  calling: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired,
  tempRemote: PropTypes.shape({
    phoneNumber: PropTypes.string
  })
};

CallModalScreen.defaultProps = {
  tempRemote: {}
};

export default CallModalScreen;

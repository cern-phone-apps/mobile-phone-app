import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';
import styles from './HangupButtonStyles';

function HangupForm({ phoneService }) {
  const hangupCall = () => {
    const hangUpdDefaultCall = true;
    phoneService.hangUpCurrentCallAction(hangUpdDefaultCall);
  };

  return (
    <View style={styles.hangupButtonContainer}>
      <TouchableOpacity style={styles.hangupButton} onPress={hangupCall}>
        <Icon
          name="call"
          size={25}
          color="white"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </TouchableOpacity>
    </View>
  );
}

HangupForm.propTypes = {
  phoneService: PropTypes.shape({
    hangUpCurrentCallAction: PropTypes.func.isRequired
  }).isRequired
};

export default withPhoneService(HangupForm);

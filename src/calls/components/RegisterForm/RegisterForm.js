import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

function RegisterForm({ phoneNumber, phoneService, token }) {
  /**
   * Register the user in the Telephony Backend
   */
  const registerUser = () => {
    phoneService.authenticateUser(phoneNumber, token);
  };

  return (
    <ListItem
      title={`${phoneNumber}`}
      chevron
      leftIcon={{ name: 'phone', type: 'font-awesome' }}
      bottomDivider
      topDivider
      onPress={registerUser}
    />
  );
}

RegisterForm.propTypes = {
  phoneService: PropTypes.shape({
    authenticateUser: PropTypes.func.isRequired
  }).isRequired,
  phoneNumber: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default withPhoneService(RegisterForm);

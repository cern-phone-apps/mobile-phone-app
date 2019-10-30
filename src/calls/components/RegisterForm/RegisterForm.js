import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

function RegisterForm({
  phoneNumber,
  phoneService,
  setActiveNumber,
  autoRegister,
  addPushDevice,
  pushDeviceToken
}) {
  /**
   * Register the user in the Telephony Backend
   */
  const registerUser = () => {
    setActiveNumber(phoneNumber);
    phoneService.authenticateUser(phoneNumber);
    addPushDevice(pushDeviceToken, phoneNumber, 'Test Phone');
  };
  if (autoRegister) registerUser();
  return (
    <ListItem
      key={`${phoneNumber}`}
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
  setActiveNumber: PropTypes.func.isRequired,
  autoRegister: PropTypes.bool.isRequired,
  addPushDevice: PropTypes.func.isRequired,
  pushDeviceToken: PropTypes.string.isRequired
};

export default withPhoneService(RegisterForm);

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { withNavigation } from 'react-navigation';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

export function DisconnectForm({ phoneService, navigation }) {
  /**
   * Register the user in the Telephony Backend
   */
  const disconnectUserAction = async () => {
    await phoneService.disconnectUser();
    navigation.navigate('Register');
  };

  return (
    <ListItem
      onPress={disconnectUserAction}
      key="changeNumber"
      title="Change registered phone number"
      leftIcon={{ name: 'phone' }}
      bottomDivider
    />
  );
}

DisconnectForm.propTypes = {
  phoneService: PropTypes.shape({
    disconnectUser: PropTypes.func.isRequired
  }).isRequired
};

const DisconnectFormWithNavigation = withNavigation(
  withPhoneService(DisconnectForm)
);

export default DisconnectFormWithNavigation;

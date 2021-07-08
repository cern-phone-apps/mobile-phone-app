import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

export function HangupForm({ phoneService }) {
  const hangupCall = () => {
    phoneService.hangUpCurrentCallAction();
  };

  return (
    <Button
      title=''
      onPress={hangupCall}
      buttonStyle={{
        marginTop: '20%',
        backgroundColor: '#f12121',
        borderRadius: 50,
        width: 70,
        height: 70
      }}
      testID="HangupForm"
      icon={
        <Icon
          name="phone-hangup"
          size={30}
          color="white"
          type="material-community"
        />
      }
    />
  );
}

HangupForm.propTypes = {
  phoneService: PropTypes.shape({
    hangUpCurrentCallAction: PropTypes.func.isRequired
  }).isRequired
};

export default withPhoneService(HangupForm);

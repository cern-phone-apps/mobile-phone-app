import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';
import { logMessage } from '../../../common/utils/logging';
import ColorPalette from '../../../styles/ColorPalette';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: ColorPalette.primary
  }
});

export class MakeCallButton extends Component {
  static propTypes = {
    phoneService: PropTypes.shape({ makeCall: PropTypes.func.isRequired })
      .isRequired,
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string
  };

  static defaultProps = {
    name: 'Unknown'
  };

  makeCall = () => {
    const { phoneService, phoneNumber, name } = this.props;

    logMessage(`Calling user ${phoneNumber}`);
    phoneService.makeCall(name, phoneNumber);
  };

  render() {
    return (
      <Button
        icon={<Icon name="phone" color="white" />}
        iconLeft
        title="Call this number"
        buttonStyle={[styles.button]}
        onPress={this.makeCall}
        testID="MakeCallButton"
      />
    );
  }
}

export default withNavigation(withPhoneService(MakeCallButton));

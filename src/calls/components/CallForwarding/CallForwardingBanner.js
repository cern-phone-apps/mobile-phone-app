import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const CallForwardingBanner = ({ callForwarding }) => {
  if (
    callForwarding['simultaneous-ring'] ||
    callForwarding['call-forwarding']
  ) {
    return (
      <View
        testID="component"
        style={{
          backgroundColor: 'yellow',
          width: '100%',
          height: 50,
          flexDirection: 'row',
          padding: 15
        }}
      >
        <Icon
          style={{ width: 20 }}
          name="md-warning"
          size={23}
          type="ionicon"
        />
        <Text
          testID="label"
          style={{ textAlignVertical: 'center', paddingLeft: 10, fontSize: 15 }}
        >
          Call-Forwarding enabled
        </Text>
      </View>
    );
  }
  return null;
};

export default CallForwardingBanner;

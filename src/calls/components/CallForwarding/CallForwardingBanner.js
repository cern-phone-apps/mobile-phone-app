import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

function CallForwardingBanner(state) {
    console.log(state);
  if (!state.status['simultaneous-ring'] && !state.status['call-forwarding']) return null;
  return (
    <View style={{
        backgroundColor: 'yellow',
        width: '100%',
        height: 50,
        padding: 5
      }}>
      <Icon style={{ width: 20 }} name="md-warning" size={23} type="ionicon" />
      <Text style={{ height: 40, width: 50 }}>Call-Forwarding enabled</Text>
    </View>
  );
}

export default CallForwardingBanner;
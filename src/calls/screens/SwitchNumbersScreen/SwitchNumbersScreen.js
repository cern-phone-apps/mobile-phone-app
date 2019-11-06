import React from 'react';
import { Text } from 'react-native-elements';

export default function SwitchNumbersScreen({ unregister, navigation }) {
  unregister();
  navigation.navigate('Register');

  return (
    <Text
      style={{ fontSize: 25, width: '100%', height: '100%', padding: '5%' }}
    >
      {'Redirecting you to the register screen...'}
    </Text>
  );
}

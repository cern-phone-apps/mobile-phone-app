import React from 'react';
import { Text, Card } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { ListItem, Button, Icon } from 'react-native-elements';

const AutoRegister = ({ autoregister, setAutoRegister }) => {
    console.log(autoregister);
  return (
    <Card>
      <Text style={{ fontWeight: 'bold' }}>
        Auto register on start using the last used phone number.
      </Text>
      <ListItem
        title="Auto-register on start"
        switch={{ onValueChange: ()=>setAutoRegister(!autoregister), value: (autoregister) ? true : false }}
      />
    </Card>
  );
};

export default AutoRegister;

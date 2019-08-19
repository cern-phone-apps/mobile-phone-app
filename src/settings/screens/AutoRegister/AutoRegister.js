import React from 'react';
import { Text, Card } from 'react-native-elements';
import { ListItem, Button, Icon } from 'react-native-elements';

const AutoRegister = (props) => {
  const { autoRegister, setRememberNumber } = props;
  return (
    <Card>
      <Text style={{ fontWeight: 'bold' }}>
        Auto register on start using the last used phone number.
      </Text>
      <ListItem
        title="Auto-register on start"
        switch={{
          onValueChange: () => setRememberNumber(!autoRegister),
          value: autoRegister
        }}
      />
    </Card>
  );
};

export default AutoRegister;

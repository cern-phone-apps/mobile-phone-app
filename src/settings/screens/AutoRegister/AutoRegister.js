import React from 'react';
import { Text, Card } from 'react-native-elements';
import { ListItem, Button, Icon } from 'react-native-elements';

const AutoRegister = (props) => {
  console.log("props passed to autoregister 0000000000000000", props);
  const { autoRegister, toggle_autoregister } = props;
  console.log(autoRegister, toggle_autoregister);
  return (
    <Card>
      <Text style={{ fontWeight: 'bold' }}>
        Auto register on start using the last used phone number.
      </Text>
      <ListItem
        title="Auto-register on start"
        switch={{
          onValueChange: () => toggle_autoregister(!autoRegister),
          value: autoRegister
        }}
      />
    </Card>
  );
};

export default AutoRegister;

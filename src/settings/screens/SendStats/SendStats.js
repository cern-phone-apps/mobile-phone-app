import React from 'react';
import { Text, Card } from 'react-native-elements';
import { ListItem, Button, Icon } from 'react-native-elements';

const SendStats = (props) => {
  const { sendStats, setSendStats } = props;
  return (
    <Card>
      <Text style={{ fontWeight: 'bold' }}>
        Help us improve this application.
      </Text>
      <ListItem
        title="Allow statistics sends"
        switch={{
          onValueChange: () => setSendStats(!sendStats),
          value: sendStats
        }}
      />
    </Card>
  );
};

export default SendStats;

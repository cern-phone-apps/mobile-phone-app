import React from 'react';
import { ScrollView, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import { List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

const modes = Object.freeze({
  DISABLED: 'disabled',
  SIMULTANEOUS: 'simultaneous',
  FORWARD_TO: 'forwardto'
});

export function CallForwardingListRingingScreen(props) {
  const {
    localRingingList,
    removeLocalRingingNumber,
    enabledRingingList,
    setEnabledRingingList
  } = props;

  const onChangeRinging = newValue => {
    let newList;
    if (enabledRingingList.includes(newValue)) {
      console.log(`Disabling number ${newValue}`);
      newList = enabledRingingList.filter(number => number !== newValue);
    } else {
      console.log(`Enabling number ${newValue}`);
      newList = [...enabledRingingList, newValue];
    }
    setEnabledRingingList(newList);
    console.log(
      `Enabled ringing list is: ${JSON.stringify(enabledRingingList)}`
    );
    console.log(enabledRingingList);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {localRingingList.map(number => (
        <List.Item
          key={number.text}
          title={number.value}
          left={() => (
            <Switch
              onChange={() => onChangeRinging(number.value)}
              value={enabledRingingList.includes(number.value)}
            />
          )}
          right={() => (
            <IconButton
              testID={`icon-button-${number.value}`}
              color="#000"
              icon="delete"
              onPress={() => {
                const newRingingList = enabledRingingList.filter(
                  n => n !== number.value
                );
                console.log(newRingingList);
                setEnabledRingingList(newRingingList);
                removeLocalRingingNumber(number);
              }}
            />
          )}
          bottomDivider
        />
      ))}
    </ScrollView>
  );
}

CallForwardingListRingingScreen.propTypes = {
  localRingingList: PropTypes.arrayOf(PropTypes.string),
  enabledRingingList: PropTypes.arrayOf(PropTypes.string)
};

CallForwardingListRingingScreen.defaultProps = {
  localRingingList: [],
  enabledRingingList: []
};
export default withNavigation(CallForwardingListRingingScreen);

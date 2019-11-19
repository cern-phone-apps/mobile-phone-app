import React from 'react';
import { ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements';
import { IconButton, RadioButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import ColorPalette from '../../../styles/ColorPalette';

function DestinationsListForward(props) {
  const {
    localForwardList,
    removeLocalForwardNumber,
    enabledForwardNumber,
    setEnabledForwardNumber
  } = props;

  const onChangeForward = newValue => {
    console.log(`Onchange forward to ${newValue}`);
    setEnabledForwardNumber(newValue);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <RadioButton.Group
        onValueChange={onChangeForward}
        value={enabledForwardNumber}
      >
        {localForwardList.map(number => (
          <ListItem
            key={number.text}
            title={number.value}
            bottomDivider
            leftElement={() => (
              <RadioButton color={ColorPalette.primary} value={number.value} />
            )}
            rightElement={() => (
              <IconButton
                testID={`icon-button-${number.value}`}
                color="#000"
                icon="delete"
                onPress={() => {
                  if (enabledForwardNumber === number.value) {
                    setEnabledForwardNumber('');
                  }
                  removeLocalForwardNumber(number);
                }}
              />
            )}
          />
        ))}
      </RadioButton.Group>
    </ScrollView>
  );
}

DestinationsListForward.propTypes = {
  localForwardList: PropTypes.arrayOf(PropTypes.string),
  enabledForwardNumber: PropTypes.string,
  setEnabledForwardNumber: PropTypes.func.isRequired,
  removeLocalForwardNumber: PropTypes.func.isRequired
};

DestinationsListForward.defaultProps = {
  localForwardList: [],
  enabledForwardNumber: ''
};
export default DestinationsListForward;

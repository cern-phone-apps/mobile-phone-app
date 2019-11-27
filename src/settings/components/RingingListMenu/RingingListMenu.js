import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons, {
  HeaderButton,
  Item
} from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton
    {...passMeFurther}
    IconComponent={Icon}
    iconSize={25}
    color="white"
  />
);

const clearRecentCallsAction = async (
  clearRecentCalls,
  setEnabledRingingList
) => {
  console.log(`Claring recent calls`);
  clearRecentCalls();
  setEnabledRingingList();
};

const clearRecentCallsFunc = (clearRecentCalls, setEnabledRingingList) => {
  Alert.alert(
    'Clear Ringing List',
    'Are you sure you want to clear all the numbers in the ringing list?',
    [
      {
        text: 'No',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          clearRecentCallsAction(clearRecentCalls, setEnabledRingingList);
        }
      }
    ]
  );
};

const RingingListMenu = ({
  clearLocalRingingList,
  addLocalRingingNumber,
  setEnabledRingingList,
  navigation
}) => (
  <HeaderButtons
    OverflowIcon={<Icon name="md-more" size={23} color="white" />}
    HeaderButtonComponent={IoniconsHeaderButton}
  >
    <Item
      iconName="md-add"
      title="Add number"
      testID="add-number"
      onPress={() =>
        navigation.navigate('SearchUsersCallForwarding', {
          mode: 'simultaneous', // modes.SIMULTANEOUS,
          saveAction: addLocalRingingNumber
        })
      }
    />
    <Item
      icon="md-clear"
      testID="clear-all"
      title="Clear all"
      onPress={() =>
        clearRecentCallsFunc(clearLocalRingingList, setEnabledRingingList)
      }
      show="never"
    />
  </HeaderButtons>
);

RingingListMenu.propTypes = {
  clearLocalRingingList: PropTypes.func.isRequired,
  addLocalRingingNumber: PropTypes.func.isRequired,
  setEnabledRingingList: PropTypes.func.isRequired
};

export default RingingListMenu;

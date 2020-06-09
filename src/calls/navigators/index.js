import { createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import DialpadStack from './call';
import RecentStack from './recent';
import SettingsStack from '../../settings/navigators/settings';
import RegisterLoadingScreenContainer from '../screens/RegisterLoadingScreen/RegisterLoadingScreenContainer';
import CallModalScreenContainer from '../screens/CallModalScreen/CallModalScreenContainer';
import RegisterStack from './register';
import ContactsStack from './contacts';
import ColorPalette from '../../styles/ColorPalette';
import SwitchNumbersScreenContainer from '../screens/SwitchNumbersScreen/SwitchNumbersScreenContainer';

export const AppStack = createMaterialBottomTabNavigator(
  {
    Call: DialpadStack,
    Recent: RecentStack,
    Contacts: ContactsStack,
    Settings: SettingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName;

        if (routeName === 'Call') {
          iconName = `ios-call`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        } else if (routeName === 'Recent') {
          iconName = `ios-time`;
        } else if (routeName === 'Contacts') {
          iconName = `ios-contacts`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    activeColor: ColorPalette.menuActive,
    inactiveColor: ColorPalette.primaryLight,
    barStyle: {
      backgroundColor: ColorPalette.primary
    }
  }
);

export const AppFullStack = createSwitchNavigator(
  {
    RegisterLoading: RegisterLoadingScreenContainer,
    SwitchNumbers: SwitchNumbersScreenContainer,
    CallModal: CallModalScreenContainer,
    AppRegistered: AppStack,
    Register: RegisterStack
  },
  {
    initialRouteName: 'RegisterLoading'
  }
);

export default AppFullStack;

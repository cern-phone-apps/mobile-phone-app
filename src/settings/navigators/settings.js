import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ColorPalette from '../../styles/ColorPalette';
import ProfileContainer from '../components/profile/ProfileContainer';
import RegisterScreenContainer from '../../calls/screens/RegisterScreen/RegisterScreenContainer';
import CallForwardingScreenContainer from '../screens/CallForwardingScreen/CallForwardingScreenContainer';
import SwitchNumbersScreenContainer from '../../calls/screens/SwitchNumbersScreen/SwitchNumbersScreenContainer';
import SearchUsersScreenForwardingContainer from '../../calls/screens/SearchUsersScreen/SearchUsersScreenForwardingContainer';
import DestinationsRingingListContainer from '../screens/CallForwardingScreen/DestinationsListRingingContainer';
import DestinationsListForwardContainer from '../screens/CallForwardingScreen/DestinationsListForwardContainer';
import RingingListMenuContainer from '../components/RingingListMenu/RingingListMenuContainer';
import ForwardListMenuContainer from '../components/ForwardListMenu/ForwardListMenuContainer';
import AutoRegisterContainer from '../screens/AutoRegister/AutoRegisterContainer';
import SendStatsContainer from '../screens/SendStats/SendStatsContainer';

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white',
          flex: 3
        },
        title: `Settings`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: () => {
      return {
        title: 'Profile',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTitleStyle: {
          flex: 3
        },
        headerTintColor: 'white'
      };
    }
  },
  AutoRegister: {
    screen: AutoRegisterContainer,
    navigationOptions: () => {
      return {
        title: 'AutoRegister',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTitleStyle: {
          flex: 3
        },
        headerTintColor: 'white'
      };
    }
  },
  CallForwarding: {
    screen: CallForwardingScreenContainer,
    navigationOptions: () => {
      return {
        title: `Call Forwarding Settings`,
        headerTitleStyle: {
          flex: 3
        },
        headerStyle: {
          backgroundColor: ColorPalette.primary,
          flex: 3
        },
        headerTintColor: 'white'
      };
    }
  },
  SwitchNumers: {
    screen: SwitchNumbersScreenContainer,
    navigationOptions: () => {
      return {
        title: `Switch Numbers`,
        headerTitleStyle: {
          flex: 3
        },
        headerStyle: {
          backgroundColor: ColorPalette.primary,
          flex: 3
        },
        headerTintColor: 'white'
      };
    }
  },
  DestinationsRingingList: {
    screen: DestinationsRingingListContainer,
    navigationOptions: () => {
      return {
        title: `Forward list`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white',
        headerRight: <RingingListMenuContainer />
      };
    }
  },
  DestinationsForwardList: {
    screen: DestinationsListForwardContainer,
    navigationOptions: () => {
      return {
        title: `Forward list`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white',
        headerRight: <ForwardListMenuContainer />
      };
    }
  },
  SearchUsersCallForwarding: {
    screen: SearchUsersScreenForwardingContainer,
    navigationOptions: () => ({
      title: 'Search for users',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  },
  RegisterNumber: {
    screen: RegisterScreenContainer,
    navigationOptions: () => {
      return {
        title: 'Select your number',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  },
  SendStats: {
    screen: SendStatsContainer,
    navigationOptions: () => {
      return {
        title: 'SendStats',
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  }
});

export default SettingsStack;

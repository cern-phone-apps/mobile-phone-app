import React from 'react';

import { IconButton } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation-stack';
import ContactsScreenContainer from '../screens/ContactsScreen/ContactsScreenContainer';
import SearchUsersScreenContainer from '../screens/SearchUsersScreen/SearchUsersScreenContainer';
import UserDetailsScreenContainer from '../screens/ContactDetailsScreen/ContactDetailsScreenContainer';
import ColorPalette from '../../styles/ColorPalette';

export default createStackNavigator({
  Contacts: {
    screen: ContactsScreenContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitleStyle: {
          color: 'white',
          flex: 3
        },
        title: `Contacts`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white',
        headerRight: (
          <IconButton
            icon="add"
            color={ColorPalette.menuActive}
            onPress={() => navigation.navigate('SearchUsers')}
          />
        ),
        headerRightContainerStyle: {
          marginRight: 10
        }
      };
    }
  },
  SearchUsers: {
    screen: SearchUsersScreenContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white',
        flex: 3
      },
      title: 'Search for users',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  },
  UserDetails: {
    screen: UserDetailsScreenContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white',
        flex: 3
      },
      title: 'User Details',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  }
});

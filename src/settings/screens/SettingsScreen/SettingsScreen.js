import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import LogoutListComponentContainer from '../../components/logout/LogoutListComponentContainer';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    const { navigation } = this.props;
    const list = [
      {
        title: 'Profile',
        icon: 'person',
        onPress: () => {
          navigation.navigate('Profile');
        }
      },
      {
        title: 'Switch phone numbers',
        icon: 'phone',
        onPress: () => {
          navigation.navigate('SwitchNumbers');
        }
      },
      {
        title: 'Call Forwarding',
        icon: 'phone-forwarded',
        onPress: () => {
          navigation.navigate('CallForwarding');
        }
      },
      {
        title: 'auto-register',
        icon: 'confirmation-number',
        onPress: () => {
          navigation.navigate('AutoRegister');
        }
      },
      {
        title: 'Statistics sends',
        icon: 'cloud-upload',
        onPress: () => {
          navigation.navigate('SendStats');
        }
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        {list.map((item, i) => (
          <ListItem
            key={i.toString()}
            title={item.title}
            leftIcon={{ name: item.icon, type: item.type }}
            onPress={() => item.onPress()}
            bottomDivider
            chevron
          />
        ))}
        <LogoutListComponentContainer />
      </View>
    );
  }
}

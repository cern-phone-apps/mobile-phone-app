import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Text } from 'react-native-elements';
import { FlatList, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function ContactsScreen({
  contacts,
  getUserContacts,
  removeUserContact,
  navigation
}) {
  useEffect(() => {
    getUserContacts();
  }, []);

  const keyExtractor = item => item.personId.toString();

  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => navigation.navigate('UserDetails', { details: item })}
        title={`${item.displayName} (${item.division})`}
        leftAvatar={{ title: item.displayName[0] }}
        rightIcon={
          <IconButton
            icon="clear"
            onPress={async () => {
              await removeUserContact(item.personId);
              getUserContacts();
            }}
          />
        }
        bottomDivider
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      personId: PropTypes.string.isRequired,
      division: PropTypes.string.isRequired
    }).isRequired
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={contacts}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text
            style={{
              display: 'flex',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10
            }}
          >
            Currently you do not have any contacts
          </Text>
        }
      />
    </View>
  );
}

ContactsScreen.navigationOptions = {
  title: 'Contacts'
};

ContactsScreen.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  getUserContacts: PropTypes.func.isRequired,
  removeUserContact: PropTypes.func.isRequired
};

ContactsScreen.defaultProps = {
  contacts: []
};

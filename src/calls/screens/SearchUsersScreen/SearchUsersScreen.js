import React, { useState } from 'react';
import { Keyboard, ActivityIndicator, FlatList, View } from 'react-native';

import PropTypes from 'prop-types';

import { Button, ListItem, SearchBar, Text } from 'react-native-elements';

import { contactsFormatter } from '../../../common/utils/formatters';

export default function SearchUsersScreen({
  addUserContact,
  searchUsers,
  getUserContacts,
  contacts,
  searching
}) {
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const keyExtractor = item => item.id;

  const onPress = async () => {
    Keyboard.dismiss();
    if (!searchText) {
      setSearchResults([]);
      return;
    }
    if (searchText.length < 3) {
      return;
    }

    const { payload } = await searchUsers(searchText);
    setSearchResults(payload);
  };

  const onChangeText = newSearchText => {
    if (!newSearchText) {
      setSearchResults([]);
    }
    setSearchText(newSearchText);
  };

  const renderItem = ({ item }) => {
    return <ListItem {...item} />;
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      personId: PropTypes.string.isRequired,
      division: PropTypes.string.isRequired
    }).isRequired
  };

  const formattedSearchResults = contactsFormatter(
    searchResults,
    contacts,
    addUserContact,
    getUserContacts
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <View style={{ flex: 3, justifyContent: 'space-around' }}>
          <SearchBar
            testID="SearchUserScreenBar"
            placeholder="Search for users"
            onChangeText={onChangeText}
            value={searchText}
            style={{ backgroundColor: 'none' }}
            onClear={() => {
              setSearchText('');
              setSearchResults([]);
            }}
            lightTheme
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#E1E8EE',
            paddingRight: 10
          }}
        >
          <Button
            testID="SearchUserScreenButton"
            title="Search"
            onPress={onPress}
            loading={searching}
            disabled={!searchText || searchText.length < 3}
          />
        </View>
      </View>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={formattedSearchResults}
          renderItem={renderItem}
          refreshing={searching}
          ListEmptyComponent={() =>
            searching ? (
              <ActivityIndicator size="large" style={{ paddingTop: 100 }} />
            ) : (
              <Text
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                There are no users matching your search criterion
              </Text>
            )
          }
        />
      </View>
    </View>
  );
}

SearchUsersScreen.navigationOptions = {
  title: 'Search users'
};

SearchUsersScreen.propTypes = {
  searching: PropTypes.bool,
  searchUsers: PropTypes.func.isRequired,
  addUserContact: PropTypes.func.isRequired,
  getUserContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string,
      personId: PropTypes.string,
      division: PropTypes.string
    })
  )
};

SearchUsersScreen.defaultProps = {
  contacts: [],
  searching: false
};

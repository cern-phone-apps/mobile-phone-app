import React, { useState } from 'react';
import { Keyboard, ActivityIndicator, FlatList, View } from 'react-native';

import PropTypes from 'prop-types';

import { Button, ListItem, SearchBar, Text } from 'react-native-elements';

import { formatResultsOneLinePerPhone } from '../../../common/utils/formatters';

export default function SearchUsersScreen({
  searchUsers,
  searching,
  navigation,
  localRingingList,
  localForwardList
}) {
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const mode = navigation.getParam('mode', 'NOT_VALID');
  const saveAction = navigation.getParam('saveAction', () =>
    console.log('Not implemented saveAction')
  );

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

  const passingProps = {
    saveAction,
    localList: mode === 'simultaneous' ? localRingingList : localForwardList
  };

  const formattedSearchResults = formatResultsOneLinePerPhone(
    searchResults,
    passingProps
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
  searchUsers: PropTypes.func.isRequired
};

SearchUsersScreen.defaultProps = {
  searching: false
};

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { FlatList, View } from 'react-native';
import moment from 'moment';
import CallForwardingBannerContainer from '../../components/CallForwarding/CallForwardingBannerContainer';

import ColorPalette from '../../../styles/ColorPalette';

export function RecentCallsScreen({ navigation, recentCalls }) {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    const printableDate = moment(item.endTime).calendar();
    const duration = moment.duration(
      moment(item.endTime).diff(moment(item.startTime))
    );
    return (
      <ListItem
        title={`${item.name} (${item.phoneNumber})`}
        subtitle={printableDate}
        leftIcon={
          item.incoming
            ? {
                name: 'arrow-downward',
                type: 'ionicons',
                color: item.missed
                  ? ColorPalette.recentCallRed
                  : ColorPalette.recentCallGreen
              }
            : {
                name: 'arrow-upward',
                type: 'ionicons',
                color: item.missed
                  ? ColorPalette.recentCallRed
                  : ColorPalette.recentCallGreen
              }
        }
        rightIcon={{ name: 'phone', type: 'font-awesome' }}
        rightSubtitle={item.missed ? 'missed' : duration.humanize()}
        bottomDivider
        onPress={() => {
          navigation.navigate('RecentCallDetails', {
            phoneNumber: item.phoneNumber,
            recentCall: item
          });
        }}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
      missed: PropTypes.string.isRequired,
      incoming: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired
    }).isRequired
  };

  return (
    <View style={{ flex: 1 }}>
      {/* other code from before here */}
      <CallForwardingBannerContainer />
      <FlatList
        keyExtractor={keyExtractor}
        data={recentCalls}
        renderItem={renderItem}
      />
    </View>
  );
}

RecentCallsScreen.navigationOptions = {
  title: 'Recent Calls'
};

RecentCallsScreen.propTypes = {
  recentCalls: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RecentCallsScreen;

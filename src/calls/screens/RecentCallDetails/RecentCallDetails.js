import React from 'react';
import { Icon, Text } from 'react-native-elements';
import { View } from 'react-native';
import moment from 'moment';
import MakeCallButton from '../../components/MakeCallButton/MakeCallButton';

import styles from './RecentCallDetailsStyles';
import useCallStatus from '../../hooks/use-call-status';

function getPrintableDate(recentCall) {
  let printableDate;
  if (recentCall.endTime) {
    printableDate = moment(recentCall.endTime).calendar();
  }
  return printableDate;
}

function getDuration(recentCall) {
  let duration;
  if (recentCall.startTime) {
    duration = moment.duration(
      moment(recentCall.endTime).diff(moment(recentCall.startTime))
    );
  }
  return duration;
}

/**
 * We use this to set the Navigation title
 */
function RecentCallDetails({ navigation }) {
  /**
   * Redirect to RegisterLoading if any of these statuses change
   */
  useCallStatus();

  const { recentCall } = navigation.state.params;

  const printableDate = getPrintableDate(recentCall);
  const duration = getDuration(recentCall);

  const missedColor = recentCall.missed ? 'red' : 'green';
  const iconName = recentCall.incoming ? 'arrow-downward' : 'arrow-upward';

  return (
    <View style={styles.container}>
      <View style={[styles.iconTextContainer]}>
        <Icon name="phone" size={40} />
        <Text h2>{recentCall.phoneNumber}</Text>
      </View>
      <View style={[styles.iconTextContainer]}>
        <Icon name="clock" type="evilicon" size={40} />
        <Icon name={iconName} color={missedColor} type="ionicons" size={20} />
        {recentCall.missed ? (
          <Text>Missed</Text>
        ) : (
          <Text>{duration ? duration.humanize() : ''}</Text>
        )}
      </View>
      <View style={[styles.iconTextContainer]}>
        <Icon name="calendar" type="evilicon" size={40} />
        <Text>{printableDate}</Text>
      </View>
      <MakeCallButton phoneNumber={recentCall.phoneNumber} />
    </View>
  );
}

RecentCallDetails.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('phoneNumber', 'Recent Call Details')
  };
};

export default RecentCallDetails;

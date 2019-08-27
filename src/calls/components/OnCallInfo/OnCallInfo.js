import { View, StyleSheet, TouchableOpacity, Icon } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Dial } from 'tone-api-mobile';
import HangupButton from '../HangupButton/HangupButton';
import Timer from '../Timer/Timer';
import styles from './OnCallInfoStyles';
import DialpadButton from './onCallDialpad';


function OnCallInfo({ remote, phoneService }) {
  const [dialpad, setDialpad] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.ongoingCall}>ONGOING CALL WITH</Text>
      <View style={styles.remoteInfo}>
        {remote && remote.name && <Text style={styles.remoteName}>{remote.name}</Text>}
        <Text style={styles.remoteNumber}>{remote.phoneNumber}</Text>
        <Timer />
      </View>
      <DialpadButton display={dialpad} onPress={() => { setDialpad(!dialpad); }} updatePhoneNumber={(e) => { phoneService.sendDtmfCommand(e) }}/>
      <View
        style={{
          position: 'absolute',
          bottom: '5%'
        }}
      >
        <HangupButton />
      </View>
    </View>
  );
}

OnCallInfo.propTypes = {
  remote: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired
};

export default OnCallInfo;

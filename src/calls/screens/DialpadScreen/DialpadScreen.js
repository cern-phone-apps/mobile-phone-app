import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import MakeCallForm from '../../components/DialpadForm/DialpadForm';
import HangupButton from '../../components/HangupButton/HangupButton';
import OnCallInfoContainer from '../../components/OnCallInfo/OnCallInfoContainer';
import CallForwardingBanner from '../../components/CallForwarding/CallForwardingBanner';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  makeCallForm: {
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: 1 }],
    paddingBottom: 10
  }
});

const callingStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  },
  iconTextContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const DialpadScreen = ({
  disabled,
  calling,
  tempRemote,
  onCall,
  connected,
  navigation,
  callForwarding
}) => {
  useEffect(() => {
    navigation.navigate(connected ? 'AppRegistered' : 'Register');
    console.log('Running useEffect -> DialpadScreen()');
  }, [connected]);

  if (onCall) {
    return <OnCallInfoContainer />;
  }

  if (calling) {
    return (
      <View style={[callingStyles.container]}>
        <View style={[callingStyles.iconTextContainer]}>
          <Text h2>Calling...</Text>
        </View>
        <View style={[callingStyles.iconTextContainer]}>
          <Icon name="phone" size={30} />
          <Text h4>{tempRemote.phoneNumber}</Text>
        </View>
        <HangupButton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CallForwardingBanner status={callForwarding}/>
      <View style={styles.makeCallForm}>
        <MakeCallForm disabled={disabled} />
      </View>
    </View>
  );
};

DialpadScreen.propTypes = {
  disabled: PropTypes.bool,
  calling: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  tempRemote: PropTypes.shape({
    phoneNumber: PropTypes.string
  }),
  callForwarding: PropTypes.bool.isRequired
};

DialpadScreen.defaultProps = {
  disabled: false,
  tempRemote: {}
};

export default withNavigation(DialpadScreen);

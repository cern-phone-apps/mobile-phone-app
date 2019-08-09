import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { RadioButton, List } from 'react-native-paper';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';

import { errorMessage } from '../../../common/utils/logging';
import ColorPalette from '../../../styles/ColorPalette';

const modes = Object.freeze({
  DISABLED: 'disabled',
  SIMULTANEOUS: 'simultaneous',
  FORWARD_TO: 'forwardto'
});

const styles = StyleSheet.create({
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: ColorPalette.primaryLight
  }
});

function CallForwardingScreen(props) {
  const [callForwadingEnabled, toggleCallForwarding] = useState(false);
  const [callForwadingMode, setCallForwardingMode] = useState(modes.FORWARD_TO);
  const [isFetching, setIsFetching] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const {
    getCallForwardingStatus,
    disableCallForwarding,
    enableSimultaneousRinging,
    enableCallForwarding,
    activeNumber,
    navigation,
    localRingingList,
    addLocalRingingNumber,
    clearLocalRingingList,
    enabledForwardNumber,
    enabledRingingList,
    setEnabledRingingList
  } = props;

  const fetchData = async () => {
    setIsFetching(true);
    const forwardingData = await getCallForwardingStatus(activeNumber);
    if (forwardingData && forwardingData.payload) {
      const callForwardingStatus = forwardingData.payload['call-forwarding'];
      const simultaneousRingingStatus =
        forwardingData.payload['simultaneous-ring'];
      const forwardingEnabled =
        callForwardingStatus || simultaneousRingingStatus;

      toggleCallForwarding(forwardingEnabled);

      if (forwardingEnabled) {
        setCallForwardingMode(
          simultaneousRingingStatus ? modes.SIMULTANEOUS : modes.FORWARD_TO
        );

        const newDestinationList = forwardingData.payload['destination-list'];
        newDestinationList.forEach(item => {
          const testR = localRingingList.filter(
            localItem => localItem.value === item
          );
          if (testR.length === 0) {
            addLocalRingingNumber(item);
          }
        });
        setEnabledRingingList(newDestinationList);
      }

      setIsFetching(false);
    } else if (forwardingData === undefined) {
      errorMessage('Forwarding data was not loaded');
    }
  };

  const save = async () => {
    let result;
    if (!callForwadingEnabled) {
      result = await disableCallForwarding(activeNumber);
    } else if (callForwadingMode === modes.FORWARD_TO) {
      result = await enableCallForwarding(activeNumber, enabledForwardNumber);
    } else {
      result = await enableSimultaneousRinging(
        activeNumber,
        enabledRingingList
      );
    }
    if (result.payload && result.payload && result.payload.success) {
      console.log(result.payload);
      showMessage({
        message: 'Call forwarding set',
        description: result.payload.message,
        type: 'success'
      });
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, [enabledRingingList]);

  const onChange = val => {
    toggleCallForwarding(val);
  };

  const onChangeMode = mode => {
    setCallForwardingMode(mode);
  };

  if (isFetching) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <ListItem
        title="Call Forwarding"
        switch={{ onValueChange: onChange, value: callForwadingEnabled }}
        bottomDivider
      />
      {callForwadingEnabled && (
        <RadioButton.Group
          onValueChange={onChangeMode}
          value={callForwadingMode}
        >
          <List.Section>
            <ListItem
              key="sim-ringing"
              title="Simultaneous ringing"
              bottomDivider
              leftElement={() => (
                <RadioButton
                  color={ColorPalette.primary}
                  value={modes.SIMULTANEOUS}
                />
              )}
            />
            {callForwadingMode === modes.SIMULTANEOUS && (
              <ListItem
                title="Select ringing numbers"
                bottomDivider
                chevron
                iconLeft="phone"
                onPress={() => {
                  navigation.navigate('DestinationsRingingList');
                }}
              />
            )}
          </List.Section>
          <List.Section>
            <ListItem
              key="forward-to"
              title="Forward to"
              bottomDivider
              leftElement={() => (
                <RadioButton
                  color={ColorPalette.primary}
                  value={modes.FORWARD_TO}
                />
              )}
            />
            {callForwadingMode === modes.FORWARD_TO && (
              <ListItem
                title="Select forward number"
                bottomDivider
                chevron
                iconLeft="phone"
                onPress={() => {
                  navigation.navigate('DestinationsForwardList');
                }}
              />
            )}
          </List.Section>
        </RadioButton.Group>
      )}
      <Button
        icon={<Icon name="save" color="white" />}
        iconLeft
        title="Save"
        buttonStyle={[styles.button]}
        onPress={() => save()}
      />
    </ScrollView>
  );
}

CallForwardingScreen.propTypes = {
  getCallForwardingStatus: PropTypes.func.isRequired,
  activeNumber: PropTypes.string.isRequired,
  disableCallForwarding: PropTypes.func.isRequired,
  enableSimultaneousRinging: PropTypes.func.isRequired,
  enableCallForwarding: PropTypes.func.isRequired,
  localRingingList: PropTypes.arrayOf(PropTypes.shape({})),
  enabledRingingList: PropTypes.arrayOf(PropTypes.string)
};

CallForwardingScreen.defaultProps = {
  localRingingList: [],
  enabledRingingList: []
};
export default withNavigation(CallForwardingScreen);

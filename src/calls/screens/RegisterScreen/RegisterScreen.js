import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Linking } from 'react-native';
import { Card, Button, Icon, Overlay, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';
import RegisterFormContainer from '../../components/RegisterForm/RegisterFormContainer';
import { logMessage } from '../../../common/utils/logging';

const NumberSectionList = ({
  data,
  title,
  deviceToken,
  setActiveNumber,
  rememberNumber,
  activeNumber,
  keyExtractor,
  renderItem
}) => {
  return (
    <React.Fragment>
      <Text
        style={{
          padding: 10,
          fontSize: 13,
          color: '#AAAAAA',
          backgroundColor: '#EEEEEE'
        }}
      >
        {title}
      </Text>
      {!data || data.length === 0 ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            paddingTop: 20,
            paddingBottom: 20,
            color: '#BBBBBB'
          }}
          keyExtractor={keyExtractor}
        >
          There are no numbers in this section
        </Text>
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
      )}
    </React.Fragment>
  );
};

export default function RegisterScreen({
  getUserPhoneNumbers,
  connected,
  navigation,
  numbers,
  toneToken,
  setActiveNumber,
  activeNumber,
  rememberNumber
}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [deviceToken, setDeviceToken] = useState('');

  /**
   * We want to save the device token in the backend
   */
  const getDeviceToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    setDeviceToken(fcmToken);
  };
  /**
   * When the connected status changes, we get the user phone numbers
   */
  useEffect(() => {
    getDeviceToken();
    if (connected) {
      logMessage('Register screen -> Connected changed to true');
      navigation.navigate('RegisterLoading');
    } else {
      getUserPhoneNumbers();
    }
  }, [connected, getUserPhoneNumbers, navigation]);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <RegisterFormContainer
        pushDeviceToken={deviceToken}
        phoneNumber={item}
        setActiveNumber={setActiveNumber}
        autoRegister={!!(rememberNumber && activeNumber === item)}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired
    }).isRequired
  };

  return (
    <View>
      <Card title='ABOUT CERTIFICATES' containerStyle={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 10 }}>
          Please, install the CERN certificates and come back to this screen if
          you haven&apos;t done it yet.
        </Text>
        <Button
          icon={<Icon name='info' color='#ffffff' type='font-awesome' />}
          onPress={() => setOverlayVisible(true)}
          title=' More info'
        />
      </Card>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 34 }}>About Certificates</Text>
          <Text
            style={{
              textAlign: 'justify'
            }}
          >
            This application requires CERN Certificates to work.Please, follow
            to install them from the following link and come back to the
            application.You may need to restart the application afterwards.
          </Text>
          <Button
            title='https://cafiles.cern.ch/cafiles/certificates/Grid.aspx'
            type='clear'
            onPress={() => {
              Linking.openURL(
                'https://cafiles.cern.ch/cafiles/certificates/Grid.aspx'
              );
            }}
          />
          <Text style={{ fontSize: 24 }}>Debug</Text>

          <Input
            placeholder='Device token'
            value={deviceToken}
            label='Device token'
          />

          <Input
            placeholder='Tone token'
            value={toneToken}
            label='Tone token'
          />

          <Button title='Close' onPress={() => setOverlayVisible(false)} />
        </View>
      </Overlay>
      <NumberSectionList
        keyExtractor={keyExtractor}
        data={numbers.personal}
        renderItem={renderItem}
        title='Personal'
      />
      <NumberSectionList
        keyExtractor={keyExtractor}
        data={numbers.shared}
        renderItem={renderItem}
        title='Shared'
      />
    </View>
  );
}

RegisterScreen.propTypes = {
  connected: PropTypes.bool.isRequired,
  numbers: PropTypes.shape({
    personal: PropTypes.arrayOf(PropTypes.string),
    shared: PropTypes.arrayOf(PropTypes.string)
  }),
  getUserPhoneNumbers: PropTypes.func.isRequired,
  setActiveNumber: PropTypes.func.isRequired,
  activeNumber: PropTypes.string
};

RegisterScreen.defaultProps = {
  numbers: []
};

RegisterScreen.navigationOptions = {
  title: 'Select a phone number'
};

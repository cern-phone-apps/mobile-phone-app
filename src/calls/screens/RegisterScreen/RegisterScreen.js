import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Linking } from 'react-native';
import { Card, Button, Icon, Overlay, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';
import RegisterFormContainer from '../../components/RegisterForm/RegisterFormContainer';
import { logMessage } from '../../../common/utils/logging';

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
  }, [connected]);

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

  const NumberSectionList = ({ data, title }) => {
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

  renderItem.propTypes = {
    item: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired
    }).isRequired
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
    >
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
            This application requires CERN Certificates to work. Please, follow
            the steps to install them from the following link and come back to
            the application. You may need to restart the application afterwards.
          </Text>
          <Input placeholder="Token" value={deviceToken} />
          <Input placeholder="Token" value={toneToken} />
          <Button
            title="https://cafiles.cern.ch/cafiles/certificates/Grid.aspx"
            type="clear"
            onPress={() => {
              Linking.openURL(
                'https://cafiles.cern.ch/cafiles/certificates/Grid.aspx'
              );
            }}
          />
          <Button title="Close" onPress={() => setOverlayVisible(false)} />
        </View>
      </Overlay>
      <NumberSectionList data={numbers.personal} title="Personal" />
      <NumberSectionList data={numbers.shared} title="Shared" />
      <View style={{ flex: 1, backgroundColor: '000' }}>
        <Card
          title={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#d4d4d4',
                borderBottomWidth: 1
              }}
            >
              <Icon name="info-circle" type="font-awesome" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                {' '}
                About Certificates
              </Text>
            </View>
          }
        >
          <Text style={{ marginTop: 5 }}>
            Please, install the CERN certificates and come back to this screen
            if you haven&apos;t done it yet.
          </Text>
          <Button
            title="More info"
            onPress={() => setOverlayVisible(true)}
            type="clear"
          />
        </Card>
      </View>
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

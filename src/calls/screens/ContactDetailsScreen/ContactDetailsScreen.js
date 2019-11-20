import React, { useEffect } from 'react';
import { Text, Icon } from 'react-native-elements';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import MakeCallButton from '../../components/MakeCallButton/MakeCallButton';
import useCallStatus from '../../hooks/use-call-status';

const ProfileDetails = ({ iconName, value, addProps }) => {
  /**
   * Redirect to RegisterLoading if any of these statuses change
   */
  useCallStatus();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 30,
        marginTop: 20
      }}
    >
      <View style={{ left: 0, width: '30%', height: 30 }}>
        <Icon name={iconName} type="entypo" size={30} />
      </View>
      <View style={{ right: 0, width: '70%', height: 30 }}>
        <Text h5 {...addProps}>
          {value}
        </Text>
      </View>
    </View>
  );
};

ProfileDetails.propTypes = {
  iconName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  addProps: PropTypes.string
};

ProfileDetails.defaultProps = {
  addProps: null
};

const WaitingForUserDetails = ({
  details,
  physicalDeliveryOfficeName,
  phones,
  email
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <View style={{ flexDirection: 'row', width: '100%', height: 100 }}>
        <View style={{ left: 0, width: '30%', height: 100 }}>
          <Icon name="ios-contact" type="ionicon" size={100} />
        </View>
        <View style={{ right: 0, width: '70%', height: 100 }}>
          <Text
            h4
            style={{
              width: '100%'
            }}
          >
            {details.displayName}
          </Text>
          <Text h5>
            {details.division}-{details.cernGroup}-{details.cernSection}
          </Text>
        </View>
      </View>
      <ProfileDetails iconName="mail" value={email} />
      <ProfileDetails
        iconName="location-pin"
        value={physicalDeliveryOfficeName}
      />
      {phones && phones[0] && phones[1].number ? (
        <ProfileDetails iconName="phone" value={phones[1].number} />
      ) : null}
      {phones ? (
        <View style={{ marginTop: 20, width: '95%' }}>
          <MakeCallButton phoneNumber={phones[1].number} />
        </View>
      ) : null}
      {phones && phones[0] && phones[0].number ? (
        <ProfileDetails iconName="mobile" value={phones[0].number} />
      ) : null}
    </View>
  );
};

WaitingForUserDetails.propTypes = {
  details: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    division: PropTypes.string.isRequired,
    cernGroup: PropTypes.string.isRequired,
    cernSection: PropTypes.string.isRequired
  }).isRequired,
  physicalDeliveryOfficeName: PropTypes.string.isRequired,
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string
    })
  ).isRequired,
  email: PropTypes.string.isRequired
};

export default function UserDetailsScreen({
  navigation,
  findUserById,
  profile
}) {
  useEffect(() => {
    const { details } = navigation.state.params;
    findUserById(details.personId);
  }, []);

  const { details } = navigation.state.params;
  const { physicalDeliveryOfficeName, phones, mail } = profile;

  if (phones && phones[0] && phones[1].number)
    return (
      <WaitingForUserDetails
        details={details}
        physicalDeliveryOfficeName={physicalDeliveryOfficeName}
        phones={phones}
        email={mail}
      />
    );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

UserDetailsScreen.navigationOptions = {
  title: 'UserDetails'
};

UserDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        details: PropTypes.shape({
          personId: PropTypes.string.isRequired
        })
      })
    })
  }).isRequired,
  findUserById: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    physicalDeliveryOfficeName: PropTypes.string,
    phones: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string
      })
    ),
    mail: PropTypes.string
  }).isRequired
};

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { callActions } from 'dial-core';
import dialBackendApi from '../../../services/api';

import UserDetailsScreen from './UserDetailsScreen';

function mapStateToProps({ contacts, profile }) {
  return {
    contacts: contacts.getContacts.contacts,
    profile: profile.profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions,
      getUserContacts: dialBackendApi().getUserContacts,
      removeUserContact: dialBackendApi().removeUserContact,
      findUserById: dialBackendApi().findUserById
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsScreen);

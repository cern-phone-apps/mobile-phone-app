import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { callActions } from 'dial-core';
import ContactsScreen from './ContactsScreen';

import dialBackendApi from '../../../services/api';

function mapStateToProps({ contacts }) {
  return {
    contacts: contacts.getContacts.contacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions,
      getUserContacts: dialBackendApi().getUserContacts,
      removeUserContact: dialBackendApi().removeUserContact
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsScreen);

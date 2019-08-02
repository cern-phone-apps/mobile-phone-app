import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchUsersScreen from './SearchUsersScreen';

import dialBackendApi from '../../../services/api';

function mapStateToProps({ search, contacts }) {
  return {
    searching: search.searching,
    contacts: contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchUsers: dialBackendApi().searchUsers,
      addUserContact: dialBackendApi().addUserContact,
      getUserContacts: dialBackendApi().getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersScreen);

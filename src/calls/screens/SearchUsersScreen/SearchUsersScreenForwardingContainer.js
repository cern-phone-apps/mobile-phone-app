import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dialBackendApi from '../../../services/api';

import SearchUsersScreenForwarding from './SearchUsersScreenForwarding';

function mapStateToProps({ search, numbers, callForwarding }) {
  return {
    searching: search.serching,
    activeNumber: numbers.activeNumber,
    localForwardList: callForwarding.localForwardList,
    localRingingList: callForwarding.localRingingList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchUsers: dialBackendApi().searchUsers
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersScreenForwarding);

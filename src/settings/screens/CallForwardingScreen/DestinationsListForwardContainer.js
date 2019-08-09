import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';
import DestinationsListForward from './DestinationsListForward';

function mapStateToProps({ callForwarding }) {
  return {
    localForwardList: callForwarding.localForwardList,
    enabledForwardNumber: callForwarding.enabledForwardNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      removeLocalForwardNumber: callForwardingActions.removeLocalForwardNumber,
      setEnabledForwardNumber: callForwardingActions.setEnabledForwardNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationsListForward);

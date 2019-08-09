import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';
import DestinationsListRinging from './DestinationsListRinging';

function mapStateToProps({ callForwarding }) {
  return {
    localRingingList: callForwarding.localRingingList,
    enabledRingingList: callForwarding.enabledRingingList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalRingingNumber: callForwardingActions.addLocalRingingNumber,
      removeLocalRingingNumber: callForwardingActions.removeLocalRingingNumber,
      clearLocalRingingList: callForwardingActions.clearLocalRingingList,
      setEnabledRingingList: callForwardingActions.setEnabledRingingList
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationsListRinging);

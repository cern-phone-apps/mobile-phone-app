import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';
import CallForwardingScreen from './CallForwardingScreen';

import dialBackendApi from '../../../services/api';

function mapStateToProps({ numbers, callForwarding }) {
  return {
    activeNumber: numbers.activeNumber,
    destinationList: callForwarding.status['destination-list'],
    localForwardList: callForwarding.localForwardList,
    localRingingList: callForwarding.localRingingList,
    enabledRingingList: callForwarding.enabledRingingList,
    enabledForwardNumber: callForwarding.enabledForwardNumber,
    lastOperationResult: callForwarding.lastOperationResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCallForwardingStatus: dialBackendApi().getCallForwardingStatus,
      disableCallForwarding: dialBackendApi().disableCallForwarding,
      enableSimultaneousRinging: dialBackendApi().enableSimultaneousRinging,
      enableCallForwarding: dialBackendApi().enableCallForwarding,
      addLocalForwardNumber: callForwardingActions.addLocalForwardNumber,
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
)(CallForwardingScreen);

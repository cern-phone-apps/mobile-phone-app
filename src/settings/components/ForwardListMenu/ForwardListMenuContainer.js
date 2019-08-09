import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';

import { withNavigation } from 'react-navigation';
import ForwardListMenu from './ForwardListMenu';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalForwardNumber: callForwardingActions.addLocalForwardNumber,
      removeLocalRingingNumber: callForwardingActions.removeLocalRingingNumber,
      clearLocalForwardList: callForwardingActions.clearLocalForwardList,
      setEnabledForwardNumber: callForwardingActions.setEnabledForwardNumber
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(ForwardListMenu));

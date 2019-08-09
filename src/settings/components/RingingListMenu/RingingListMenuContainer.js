import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';

import { withNavigation } from 'react-navigation';
import RingingListMenu from './RingingListMenu';

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
  null,
  mapDispatchToProps
)(withNavigation(RingingListMenu));

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { meActions } from 'dial-core';
import SendStats from './SendStats';

function mapStateToProps({ user }) {
  return {
    sendStats: user.sendStats
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSendStats: meActions.setSendStats
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendStats);

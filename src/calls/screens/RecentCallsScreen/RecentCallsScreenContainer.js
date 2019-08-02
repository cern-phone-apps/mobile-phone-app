import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { callActions } from 'dial-core';
import { RecentCallsScreen } from './RecentCallsScreen';

function mapStateToProps({ recent }) {
  return {
    recentCalls: recent.recentCalls
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentCallsScreen);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectionActions } from 'dial-core';
import SwitchNumbersScreen from './SwitchNumbersScreen';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unregister: connectionActions.setDisconnectionSuccess
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(SwitchNumbersScreen);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoRegister from './AutoRegister';
import { meActions } from 'dial-core';

function mapStateToProps({ user }) {
  return {
    autoRegister: user.rememberNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setRememberNumber: meActions.setRemberNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoRegister);

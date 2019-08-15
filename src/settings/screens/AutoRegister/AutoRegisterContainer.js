import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoRegister from './AutoRegister';
import * as meActions from '../../../../modules/core/src/actions/me';

function mapStateToProps({ user }) {
  return {
    autoRegister: user.autoRegister
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggle_autoregister: meActions.setAutoRegisterValue
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoRegister);

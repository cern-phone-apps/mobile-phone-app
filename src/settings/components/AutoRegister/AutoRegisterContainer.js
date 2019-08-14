import { connect } from 'react-redux';
import AutoRegister from './AutoRegister';
import dialBackendApi from '../../../services/api';

function mapStateToProps({ user }) {
  return {
    autoregister: user.autoregister
  };
}

function mapDispatchToProps() {
  return ({
    setAutoRegister: dialBackendApi().setAutoRegister
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoRegister);
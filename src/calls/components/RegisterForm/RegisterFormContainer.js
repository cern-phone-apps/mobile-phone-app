import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import dialBackendApi from '../../../services/api';

import RegisterForm from './RegisterForm';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addPushDevice: dialBackendApi().addPushDevice
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);

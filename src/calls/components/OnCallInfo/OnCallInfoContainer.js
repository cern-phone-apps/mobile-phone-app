import { connect } from 'react-redux';
import OnCallInfo from './OnCallInfo';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

function mapStateToProps({ call }) {
  return {
    remote: call.remote
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withPhoneService(OnCallInfo));

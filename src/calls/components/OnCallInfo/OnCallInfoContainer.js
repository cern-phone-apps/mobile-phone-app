import { connect } from 'react-redux';
import OnCallInfo from './OnCallInfo';

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
)(OnCallInfo);

import { connect } from 'react-redux';
import CallForwardingBanner from './CallForwardingBanner';

function mapStateToProps({ callForwarding }) {
  return {
    callForwarding: callForwarding.status
  };
}

export default connect(mapStateToProps)(CallForwardingBanner);

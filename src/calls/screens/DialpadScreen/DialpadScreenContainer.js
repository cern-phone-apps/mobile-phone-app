import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConnectedScreen from './DialpadScreen';
import dialBackendApi from '../../../services/api';

function mapStateToProps({ call, connection, numbers }) {
  return {
    disabled: call.onCall,
    connected: connection.connected,
    activeNumber: numbers.activeNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCallForwardingStatus: dialBackendApi().getCallForwardingStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedScreen);

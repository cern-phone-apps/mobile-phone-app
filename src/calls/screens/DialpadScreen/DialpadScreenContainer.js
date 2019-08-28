import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConnectedScreen from './DialpadScreen';
import dialBackendApi from '../../../services/api';

function mapStateToProps({ call, connection, numbers }) {
  return {
    onCall: call.onCall,
    disabled: call.onCall,
    calling: call.calling,
    tempRemote: call.tempRemote,
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

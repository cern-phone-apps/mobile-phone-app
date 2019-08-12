import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';

function mapStateToProps({ call, connection, callForwarding }) {
  return {
    onCall: call.onCall,
    disabled: call.onCall,
    calling: call.calling,
    tempRemote: call.tempRemote,
    connected: connection.connected
  };
}

export default connect(mapStateToProps)(ConnectedScreen);

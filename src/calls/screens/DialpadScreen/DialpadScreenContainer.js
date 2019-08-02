import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';

function mapStateToProps({ call, connection }) {
  return {
    onCall: call.onCall,
    disabled: call.onCall,
    calling: call.calling,
    recipient: call.tempRemote,
    connected: connection.connected
  };
}

export default connect(mapStateToProps)(ConnectedScreen);

import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';

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

export default connect(mapStateToProps)(ConnectedScreen);

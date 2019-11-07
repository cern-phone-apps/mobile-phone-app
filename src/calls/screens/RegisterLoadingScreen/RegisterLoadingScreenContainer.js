import { connect } from 'react-redux';
import RegisterLoadingScreen from './RegisterLoadingScreen';

function mapStateToProps({ connection, call }) {
  return {
    connected: connection ? connection.connected : false,
    onCall: call.onCall,
    disabled: call.onCall,
    calling: call.calling
  };
}

export default connect(mapStateToProps)(RegisterLoadingScreen);

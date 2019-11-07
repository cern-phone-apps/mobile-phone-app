import { connect } from 'react-redux';
import CallModalScreen from './CallModalScreen';

function mapStateToProps({ call }) {
  return {
    onCall: call.onCall,
    calling: call.calling,
    tempRemote: call.tempRemote
  };
}

export default connect(
  mapStateToProps,
  null
)(CallModalScreen);

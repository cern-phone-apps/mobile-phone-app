import { connect } from 'react-redux';
import RecentCallDetails from './RecentCallDetails';

function mapStateToProps({ call }) {
  return {
    calling: call.calling
  };
}

export default connect(mapStateToProps)(RecentCallDetails);

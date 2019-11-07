import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavigationService from '../navigators/navigation-service';

function useCallStatus() {
  const onCall = useSelector(state => state.call.onCall);
  const calling = useSelector(state => state.call.calling);

  /**
   * Redirect to RegisterLoading if any of these statuses change
   */
  useEffect(() => {
    if (onCall || calling) {
      NavigationService.navigate('RegisterLoading');
    }
  }, [onCall, calling]);

  return true;
}

export default useCallStatus;

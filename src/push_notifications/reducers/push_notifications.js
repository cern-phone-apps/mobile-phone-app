import * as actions from '../actions/push_notifications';

const INITIAL_STATE = {
  adding: false,
  added: false,
  errors: undefined
};

const pushDevicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.ADD_PUSH_DEVICE_REQUEST:
      return {
        ...state,
        adding: true,
        added: false,
        errors: undefined
      };

    case actions.ADD_PUSH_DEVICE_SUCCESS:
      return {
        ...state,
        added: true,
        adding: false,
        errors: undefined
      };

    case actions.ADD_PUSH_DEVICE_FAILURE:
      return {
        ...state,
        errors: action.payload.error
      };
    default:
      return state;
  }
};

export default pushDevicesReducer;

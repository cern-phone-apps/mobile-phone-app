import { settingsActionsMessages } from '../actions/app-state';

const INITIAL_STATE = {
  isInBackground: true
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case settingsActionsMessages.SET_APP_STATE:
      return {
        ...state,
        isInBackground: action.isInBackground
      };
    default:
      return state;
  }
};

export default settingsReducer;

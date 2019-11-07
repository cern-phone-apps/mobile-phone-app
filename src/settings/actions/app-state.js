export const settingsActionsMessages = {
  SET_APP_STATE: '@SETTINGS/SET_APP_STATE'
};

export function setAppState(isInBackground) {
  return {
    type: settingsActionsMessages.SET_APP_STATE,
    isInBackground
  };
}

export const settingsActions = {
  setAppState
};

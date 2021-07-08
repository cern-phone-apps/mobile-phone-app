import { settingsActions } from '../actions/app-state';
import appStateReducer from './app-state';

const initialState = () => {
  isInBackground: false;
};

test('Render the component', async () => {
  const action = settingsActions.setAppState(true);
  const state = initialState();
  const postState = appStateReducer(state, action);
  expect(initialState()).toEqual(state);
  expect(postState).toEqual({
    isInBackground: true
  });
});

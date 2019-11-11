import { settingsActions } from './app-state';

test('Render the component', async () => {
  expect(settingsActions.setAppState(true)).toEqual({
    type: '@SETTINGS/SET_APP_STATE',
    isInBackground: true
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import LogoutListComponent from './LogoutListComponent';

const phoneService = {
  disconnectUser: jest.fn(() => {})
};

const navigation = {
  navigate: jest.fn(text => {
    expect(text).toEqual('Auth');
  })
};

const logout = jest.fn(() => {});
/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <LogoutListComponent
      logout={logout}
      navigation={navigation}
      phoneService={phoneService}
    />
  );

  expect(queryByTestId('LogoutListComponent')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

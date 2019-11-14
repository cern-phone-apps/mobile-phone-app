import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import LogoutMenu from './LogoutMenu';

const logout = jest.fn(() => {});

const phoneService = {
  disconnectUser: jest.fn(() => {})
};

const navigation = {
  navigate: jest.fn(() => {})
};

test('Render the component', async () => {
  const { baseElement } = render(
    <LogoutMenu
      logout={logout}
      phoneService={phoneService}
      navigation={navigation}
    />
  );
  expect(baseElement).toMatchSnapshot();
});

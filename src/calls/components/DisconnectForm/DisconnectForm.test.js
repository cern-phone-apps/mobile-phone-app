import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { DisconnectForm } from './DisconnectForm';

const phoneService = {
  disconnectUser: jest.fn(() => {})
};
const navigation = {
  navigate: jest.fn(() => {})
};

/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <DisconnectForm navigation={navigation} phoneService={phoneService} />
  );

  expect(queryByTestId('DisconnectForm')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

/*
  We press the button
*/
test('Render the component', async () => {
  const { queryByTestId } = render(
    <DisconnectForm navigation={navigation} phoneService={phoneService} />
  );

  expect(queryByTestId('DisconnectForm')).not.toBeNull();
  const button = queryByTestId('DisconnectForm');
  fireEvent.press(button);
  expect(phoneService.disconnectUser).toHaveBeenCalledTimes(1);
  //TODO I don't know how make the mock of the function disconnectUser that inside the component make a await when you press the button
});

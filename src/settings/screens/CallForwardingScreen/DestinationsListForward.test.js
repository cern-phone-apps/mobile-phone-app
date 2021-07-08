import React from 'react';
import {
  waitForElement,
  render,
  fireEvent
} from '@testing-library/react-native';
import DestinationsListForward from './DestinationsListForward';

const removeLocalForwardNumber = jest.fn(() => {});
const setEnabledForwardNumber = jest.fn(() => {});

test('Render the component and press save', async () => {
  const { baseElement, queryByTestId } = render(
    <DestinationsListForward
      removeLocalForwardNumber={removeLocalForwardNumber}
      enabledForwardNumber="64444"
      setEnabledForwardNumber={setEnabledForwardNumber}
      localForwardList={[
        {
          text: 'one',
          value: '64443'
        },
        {
          text: 'two',
          value: '64444'
        },
        {
          text: 'three',
          value: '64445'
        }
      ]}
    />
  );

  expect(baseElement).toMatchSnapshot();
  expect(queryByTestId('icon-button-64443')).not.toBeNull();
  expect(queryByTestId('icon-button-64444')).not.toBeNull();
  expect(queryByTestId('icon-button-64445')).not.toBeNull();
  const button = queryByTestId('icon-button-64444');
  fireEvent.press(button);
  expect(setEnabledForwardNumber).toHaveBeenCalledTimes(1);
  expect(removeLocalForwardNumber).toHaveBeenCalledTimes(1);
  const button2 = queryByTestId('icon-button-64443');
  fireEvent.press(button2);
  expect(setEnabledForwardNumber).toHaveBeenCalledTimes(1);
  expect(removeLocalForwardNumber).toHaveBeenCalledTimes(2);
});

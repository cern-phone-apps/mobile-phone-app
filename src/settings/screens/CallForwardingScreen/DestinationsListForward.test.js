import React from 'react';
import {
  waitForElement,
  render,
  fireEvent
} from '@testing-library/react-native';
import DestinationsListForward from './DestinationsListForward';

const removeLocalForwardNumber = jest.fn(() => {});
const enabledForwardNumber = jest.fn(() => {});
const setEnabledForwardNumber = jest.fn(() => {});

test('Render the component and press save', async () => {
  const { baseElement, getByTestId } = render(
    <DestinationsListForward
      removeLocalForwardNumber={removeLocalForwardNumber}
      enabledForwardNumber={enabledForwardNumber}
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
});

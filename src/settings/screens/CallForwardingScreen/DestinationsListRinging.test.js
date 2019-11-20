import React from 'react';
import {
  waitForElement,
  render,
  fireEvent
} from '@testing-library/react-native';
import { CallForwardingListRingingScreen } from './DestinationsListRinging';

const removeLocalRingingNumber = jest.fn(() => {});
const setEnabledRingingList = jest.fn(() => {});

test('Render the component and press save', async () => {
  const { baseElement, queryByTestId } = render(
    <CallForwardingListRingingScreen
      localRingingList={[
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
      removeLocalRingingNumber={removeLocalRingingNumber}
      enabledForwardNumber="64444"
      setEnabledRingingList={setEnabledRingingList}
    />
  );

  expect(baseElement).toMatchSnapshot();
  const button = queryByTestId('icon-button-64444');
  fireEvent.press(button);
  expect(setEnabledRingingList).toHaveBeenCalledTimes(1);
  expect(removeLocalRingingNumber).toHaveBeenCalledTimes(1);
});

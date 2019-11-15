import React from 'react';
import {
  waitForElement,
  render,
  fireEvent
} from '@testing-library/react-native';
import { CallForwardingScreen } from './CallForwardingScreen';

const result = {
  payload: {
    success: true,
    message: 'Message'
  }
};

const activeNumber = '64446';
const navigation = {
  navigate: jest.fn(() => {})
};
const localRingingList = [
  {
    value: '1'
  },
  {
    value: '2'
  },
  {
    value: '3'
  }
];

const enabledForwardNumber = false;
const enabledRingingList = [];

test('Render the component and press save', async () => {
  const disableCallForwarding = jest
    .fn(() => {})
    .mockReturnValueOnce(Promise.resolve('result1'));
  const enableCallForwarding = jest
    .fn(() => {})
    .mockReturnValueOnce(Promise.resolve(result));
  const enableSimultaneousRinging = jest
    .fn(() => {})
    .mockReturnValueOnce(Promise.resolve(result));
  const addLocalRingingNumber = jest.fn(() => {});
  const setEnabledRingingList = jest.fn(() => {});
  const getCallForwardingStatus = jest
    .fn(() => {})
    .mockReturnValueOnce(
      Promise.resolve({
        payload: {
          'call-forwarding': true,
          'simultaneous-ring': true,
          'destination-list': ['1']
        }
      })
    );

  const { baseElement, getByTestId } = render(
    <CallForwardingScreen
      getCallForwardingStatus={getCallForwardingStatus}
      disableCallForwarding={disableCallForwarding}
      enableSimultaneousRinging={enableSimultaneousRinging}
      enableCallForwarding={enableCallForwarding}
      activeNumber={activeNumber}
      navigation={navigation}
      localRingingList={localRingingList}
      addLocalRingingNumber={addLocalRingingNumber}
      enabledForwardNumber={enabledForwardNumber}
      enabledRingingList={enabledRingingList}
      setEnabledRingingList={setEnabledRingingList}
    />
  );

  await waitForElement(() => getByTestId('ButtonCallForwardingScreen'));
  expect(baseElement).toMatchSnapshot();
  expect(setEnabledRingingList).toHaveBeenCalledTimes(1);
  const button = getByTestId('ButtonCallForwardingScreen');
  fireEvent.press(button);
  expect(enableSimultaneousRinging).toHaveBeenCalledTimes(1);
  expect(getCallForwardingStatus).toHaveBeenCalledTimes(1);
});

test('Render the component and press save without localRingingList and with simultaneous-ring at false', async () => {
  const disableCallForwarding = jest
    .fn(() => {})
    .mockReturnValueOnce(Promise.resolve('result1'));
  const enableCallForwarding = jest
    .fn(() => {})
    .mockReturnValueOnce(Promise.resolve(result));
  const enableSimultaneousRinging = jest
    .fn(() => {})
    .mockReturnValueOnce(Promise.resolve(result));
  const addLocalRingingNumber = jest.fn(() => {});
  const setEnabledRingingList = jest.fn(() => {});
  const getCallForwardingStatus = jest
    .fn(() => {})
    .mockReturnValueOnce(
      Promise.resolve({
        payload: {
          'call-forwarding': true,
          'simultaneous-ring': false,
          'destination-list': ['1']
        }
      })
    );

  const { baseElement, getByTestId } = render(
    <CallForwardingScreen
      getCallForwardingStatus={getCallForwardingStatus}
      disableCallForwarding={disableCallForwarding}
      enableSimultaneousRinging={enableSimultaneousRinging}
      enableCallForwarding={enableCallForwarding}
      activeNumber={activeNumber}
      navigation={navigation}
      localRingingList={[]}
      addLocalRingingNumber={addLocalRingingNumber}
      enabledForwardNumber={enabledForwardNumber}
      enabledRingingList={enabledRingingList}
      setEnabledRingingList={setEnabledRingingList}
    />
  );

  await waitForElement(() => getByTestId('ButtonCallForwardingScreen'));
  expect(baseElement).toMatchSnapshot();
  expect(addLocalRingingNumber).toHaveBeenCalledTimes(1);
  const button = getByTestId('ButtonCallForwardingScreen');
  fireEvent.press(button);
  expect(enableCallForwarding).toHaveBeenCalledTimes(1);
});

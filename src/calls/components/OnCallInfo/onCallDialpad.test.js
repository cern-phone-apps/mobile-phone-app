import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import DialpadButton from './onCallDialpad';

const onPress = jest.fn(() => {});
const updatePhoneNumber = jest.fn(() => {});

const insertNumber = (numbers, queryByTestId) => {
  numbers.split('').forEach(value => {
    const button = queryByTestId(`dial-button-${value}`);
    fireEvent.press(button);
  });
};

test('Render the component with true display', async () => {
  const { baseElement } = render(
    <DialpadButton
      display={true}
      onPress={onPress}
      updatePhoneNumber={updatePhoneNumber}
    />
  );
  expect(baseElement).toMatchSnapshot();
});

test('Render the component with false display', async () => {
  const { baseElement } = render(
    <DialpadButton
      display={false}
      onPress={onPress}
      updatePhoneNumber={updatePhoneNumber}
    />
  );
  expect(baseElement).toMatchSnapshot();
});

test('Render the component with true display and latter press the TouchableOpacity', async () => {
  const { queryByTestId } = render(
    <DialpadButton
      display={true}
      onPress={onPress}
      updatePhoneNumber={updatePhoneNumber}
    />
  );
  fireEvent.press(queryByTestId('TouchableOpacity1'));
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('Render the component with false display and latter press the TouchableOpacity', async () => {
  const { queryByTestId } = render(
    <DialpadButton
      display={false}
      onPress={onPress}
      updatePhoneNumber={updatePhoneNumber}
    />
  );
  fireEvent.press(queryByTestId('TouchableOpacity2'));
  expect(onPress).toHaveBeenCalledTimes(2);
});

test('Check the updatePhoneNumber', async () => {
  const { queryByTestId } = render(
    <DialpadButton
      display={true}
      onPress={onPress}
      updatePhoneNumber={updatePhoneNumber}
    />
  );
  const phoneNumber = '64446';
  insertNumber(phoneNumber, queryByTestId);
  expect(updatePhoneNumber).toHaveBeenCalledTimes(5);
});

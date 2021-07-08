import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { DialpadForm } from './DialpadForm';

const phoneService = {
  makeCall: (element, phoneNumber) => {}
};

const insertNumber = (numbers, queryByTestId) => {
  numbers.split('').forEach(value => {
    const button = queryByTestId(`dial-button-${value}`);
    fireEvent.press(button);
  });
};

const removeNumber = queryByTestId => {
  const button = queryByTestId('remove-number-button');
  fireEvent.press(button);
};

const cleanNumber = queryByTestId => {
  const button = queryByTestId('remove-number-button');
  fireEvent.longPress(button);
};

/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <DialpadForm disabled={false} phoneService={phoneService} />
  );

  expect(queryByTestId('dialpad-form-component')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

test('Update the phone number and remove', async () => {
  const { queryByTestId, baseElement } = render(
    <DialpadForm disabled={false} phoneService={phoneService} />
  );

  const phoneNumber = '64446';
  expect(queryByTestId('dialpad-form-component')).not.toBeNull();
  insertNumber(phoneNumber, queryByTestId);
  expect(baseElement).toMatchSnapshot();
  removeNumber(queryByTestId);
  expect(baseElement).toMatchSnapshot();
  cleanNumber(queryByTestId);
  expect(baseElement).toMatchSnapshot();
});

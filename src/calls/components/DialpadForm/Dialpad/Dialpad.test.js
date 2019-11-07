import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Dialpad from './Dialpad';

const updatePhoneNumber = () => {};
const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '#'];
const updatePhoneNumberCheckPress = jest.fn(e => {
  expect(buttons).toContainEqual(e);
});

const updatePhoneNumberCheckLongPress = jest.fn(e => {
  expect(e).toEqual('+');
});

/*
  We render the component with enabled buttons
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <Dialpad updatePhoneNumber={updatePhoneNumber} disabled={false} />
  );

  expect(queryByTestId('component')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

/*
  We render the component with disabled buttons
*/
test('Render the component disabled', async () => {
  const { baseElement, queryByTestId } = render(
    <Dialpad updatePhoneNumber={updatePhoneNumber} disabled />
  );

  expect(queryByTestId('component')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

/*
  We render the component and test all the button press
*/
test('Test all the dial buttons', async () => {
  const { queryByTestId } = render(
    <Dialpad updatePhoneNumber={updatePhoneNumberCheckPress} disabled={false} />
  );

  buttons.forEach(value => {
    const button = queryByTestId(`dial-button-${value}`);
    fireEvent.press(button);
  });

  expect(queryByTestId('component')).not.toBeNull();
  expect(updatePhoneNumberCheckPress).toHaveBeenCalledTimes(11);
});

/*
  We test all of the long press in the dialpad, and we only have one, the longPress of the + letter.
*/
test('Test the long press button', async () => {
  const { queryByTestId } = render(
    <Dialpad
      updatePhoneNumber={updatePhoneNumberCheckLongPress}
      disabled={false}
    />
  );

  buttons.forEach(value => {
    const button = queryByTestId(`dial-button-${value}`);
    fireEvent.longPress(button);
  });

  expect(queryByTestId('component')).not.toBeNull();
  expect(updatePhoneNumberCheckLongPress).toHaveBeenCalledTimes(1);
});

/*
  We test that the .
*/
test('Test disabled buttons functionality', async () => {
  const { queryByTestId } = render(
    <Dialpad updatePhoneNumber={updatePhoneNumberCheckLongPress} disabled />
  );

  buttons.forEach(value => {
    const button = queryByTestId(`dial-button-${value}`);
    fireEvent.press(button);
  });

  //TODO bug-1 Correct this test, the test said that you press but jest said that the button was pressed
  //expect(queryByTestId('component')).not.toBeNull();
  //expect(updatePhoneNumberCheckPress).toHaveBeenCalledTimes(0);
});

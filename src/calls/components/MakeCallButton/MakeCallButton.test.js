import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { MakeCallButton } from './MakeCallButton';

const phoneNumber = '64446';
const name = 'nombre';
const phoneService = {
  makeCall: jest.fn((nameReceived, phoneReceived) => {
    expect(phoneNumber).toEqual(phoneReceived);
    expect(name).toEqual(nameReceived);
  })
};

/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <MakeCallButton
      phoneNumber={phoneNumber}
      phoneService={phoneService}
      name={name}
    />
  );

  expect(queryByTestId('MakeCallButton')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

/*
  We press the button
*/
test('Render the component and press the button', async () => {
  const { queryByTestId } = render(
    <MakeCallButton
      phoneNumber={phoneNumber}
      phoneService={phoneService}
      name={name}
    />
  );

  expect(queryByTestId('MakeCallButton')).not.toBeNull();
  const button = queryByTestId('MakeCallButton');
  fireEvent.press(button);
  expect(phoneService.makeCall).toHaveBeenCalledTimes(1);
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HangupForm } from './HangupButton';

const phoneService = {
  hangUpCurrentCallAction: jest.fn(() => {})
};

/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <HangupForm phoneService={phoneService} />
  );

  expect(queryByTestId('HangupForm')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

/*
  We press the button
*/
test('Render the component and press the button', async () => {
  const { queryByTestId } = render(<HangupForm phoneService={phoneService} />);

  expect(queryByTestId('HangupForm')).not.toBeNull();
  const button = queryByTestId('HangupForm');
  fireEvent.press(button);
  expect(phoneService.hangUpCurrentCallAction).toHaveBeenCalledTimes(1);
});

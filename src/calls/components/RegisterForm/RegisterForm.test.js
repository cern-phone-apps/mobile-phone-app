import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { RegisterForm } from './RegisterForm';

const phoneNumber = "64446";
const token = "token";
const addPushDevice = jest.fn((pushDeviceToken, phoneReceived, phoneType) => {
  expect(pushDeviceToken).toEqual(token);
  expect(phoneNumber).toEqual(phoneReceived);
  expect(phoneType).toEqual('Android Phone');
});

const setActiveNumber = jest.fn(phoneReceived => {
  expect(phoneNumber).toEqual(phoneReceived);
});

const phoneService = {
  authenticateUser: jest.fn((phoneReceived) => {
    expect(phoneNumber).toEqual(phoneReceived);
  })
};
/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <RegisterForm 
      phoneService={phoneService}
      setActiveNumber={setActiveNumber}
      addPushDevice={addPushDevice} 
      autoRegister={false} 
      pushDeviceToken={token} 
      phoneNumber={phoneNumber}
    />
  );

  expect(queryByTestId('RegisterForm')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
  expect(addPushDevice).toHaveBeenCalledTimes(0);
  expect(setActiveNumber).toHaveBeenCalledTimes(0);
  expect(phoneService.authenticateUser).toHaveBeenCalledTimes(0);
  fireEvent.press(queryByTestId('RegisterForm'));
  expect(addPushDevice).toHaveBeenCalledTimes(1);
  expect(setActiveNumber).toHaveBeenCalledTimes(1);
  expect(phoneService.authenticateUser).toHaveBeenCalledTimes(1);
});

/*
  We render the component and make autologin
*/
test('Render the component with autoregister', async () => {
  const { baseElement, queryByTestId } = render(
    <RegisterForm 
      phoneService={phoneService}
      setActiveNumber={setActiveNumber}
      addPushDevice={addPushDevice} 
      autoRegister={true} 
      pushDeviceToken={token} 
      phoneNumber={phoneNumber}
    />
  );
  
  expect(queryByTestId('RegisterForm')).not.toBeNull();
  expect(addPushDevice).toHaveBeenCalledTimes(2);
  expect(setActiveNumber).toHaveBeenCalledTimes(2);
  expect(phoneService.authenticateUser).toHaveBeenCalledTimes(2);
});
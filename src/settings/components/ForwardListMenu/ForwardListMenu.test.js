import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ForwardListMenu from './ForwardListMenu';

const setEnabledForwardNumber = jest.fn(() => {});

const navigation = {
  navigate: jest.fn(text => {
    expect(text).toEqual('SearchUsersCallForwarding');
  })
};

const clearLocalForwardList = jest.fn(text => {
  expect(text).toEqual('Auth');
});

const addLocalForwardNumber = jest.fn(() => {});
/*
  We render the component
*/
test('Render the component andd press the button navigate', async () => {
  const { baseElement, queryByTestId } = render(
    <ForwardListMenu
      navigation={navigation}
      addLocalForwardNumber={addLocalForwardNumber}
      clearLocalForwardList={clearLocalForwardList}
      setEnabledForwardNumber={setEnabledForwardNumber}
    />
  );

  expect(baseElement).toMatchSnapshot();
  const button = queryByTestId('add-number');
  fireEvent.press(button);
  expect(navigation.navigate).toHaveBeenCalledTimes(1);
});

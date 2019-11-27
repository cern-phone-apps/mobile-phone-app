import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RingingListMenu from './RingingListMenu';

const setEnabledRingingList = jest.fn(() => {});

const navigation = {
  navigate: jest.fn(text => {
    expect(text).toEqual('SearchUsersCallForwarding');
  })
};

const clearLocalRingingList = jest.fn(text => {
  expect(text).toEqual('Auth');
});

const addLocalRingingNumber = jest.fn(() => {});
/*
  We render the component
*/
test('Render the component andd press the button navigate', async () => {
  const { baseElement, queryByTestId } = render(
    <RingingListMenu
      navigation={navigation}
      addLocalRingingNumber={addLocalRingingNumber}
      clearLocalRingingList={clearLocalRingingList}
      setEnabledRingingList={setEnabledRingingList}
    />
  );

  expect(baseElement).toMatchSnapshot();
  const button = queryByTestId('add-number');
  fireEvent.press(button);
  expect(navigation.navigate).toHaveBeenCalledTimes(1);
});

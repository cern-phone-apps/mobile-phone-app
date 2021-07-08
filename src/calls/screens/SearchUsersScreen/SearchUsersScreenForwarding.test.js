import React from 'react';
import {
  waitForElement,
  render,
  fireEvent
} from '@testing-library/react-native';
import SearchUsersScreenForwarding from './SearchUsersScreenForwarding';

test('Render the component', async () => {
  const searchUsers = jest
    .fn(() => {})
    .mockReturnValueOnce(
      Promise.resolve([
        {
          displayName: 'DisplayName1',
          personId: 'PersonId1',
          division: 'Division1'
        }
      ])
    );
  const localRingingList = jest.fn(() => {});

  const localForwardList = jest.fn(() => {});
  const mode = 'simultaneous';
  const { baseElement, getByTestId } = render(
    <SearchUsersScreenForwarding
      addUserContact={localRingingList}
      searchUsers={searchUsers}
      getUserContacts={localForwardList}
      navigation={{
        getParam(param) {
          if (param === 'mode') {
            return mode;
          }

          if (param === 'saveAction') {
            return mode;
          }
        }
      }}
      searching={true}
    />
  );
  expect(baseElement).toMatchSnapshot();
  fireEvent.changeText(getByTestId('SearchBarId'), 'DisplayName');
  fireEvent.press(getByTestId('Button'));
  expect(baseElement).toMatchSnapshot();
});

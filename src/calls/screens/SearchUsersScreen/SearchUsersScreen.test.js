import React from 'react';
import {
  waitForElement,
  render,
  fireEvent
} from '@testing-library/react-native';
import SearchUsersScreen from './SearchUsersScreen';

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
  const addUserContact = jest.fn(() => {});

  const getUserContacts = jest.fn(() => {});

  const contacts = [
    {
      displayName: 'DisplayName1',
      personId: 'PersonId1',
      division: 'Division1'
    },
    {
      displayName: 'DisplayName2',
      personId: 'PersonId2',
      division: 'Division2'
    }
  ];

  const { baseElement, getByTestId } = render(
    <SearchUsersScreen
      addUserContact={addUserContact}
      searchUsers={searchUsers}
      getUserContacts={getUserContacts}
      contacts={contacts}
      searching={true}
    />
  );
  expect(baseElement).toMatchSnapshot();
  fireEvent.changeText(getByTestId('SearchUserScreenBar'), 'DisplayName');
  fireEvent.press(getByTestId('SearchUserScreenButton'));
  expect(baseElement).toMatchSnapshot();
});

test('Render the component with 2 characters', async () => {
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
  const addUserContact = jest.fn(() => {});

  const getUserContacts = jest.fn(() => {});

  const contacts = [
    {
      displayName: 'DisplayName1',
      personId: 'PersonId1',
      division: 'Division1'
    },
    {
      displayName: 'DisplayName2',
      personId: 'PersonId2',
      division: 'Division2'
    }
  ];

  const { baseElement, getByTestId } = render(
    <SearchUsersScreen
      addUserContact={addUserContact}
      searchUsers={searchUsers}
      getUserContacts={getUserContacts}
      contacts={contacts}
      searching={true}
    />
  );
  fireEvent.changeText(getByTestId('SearchUserScreenBar'), '12');
  fireEvent.press(getByTestId('SearchUserScreenButton'));
  expect(baseElement).toMatchSnapshot();
});

test('Render the component with empty', async () => {
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
  const addUserContact = jest.fn(() => {});

  const getUserContacts = jest.fn(() => {});

  const contacts = [
    {
      displayName: 'DisplayName1',
      personId: 'PersonId1',
      division: 'Division1'
    },
    {
      displayName: 'DisplayName2',
      personId: 'PersonId2',
      division: 'Division2'
    }
  ];

  const { baseElement, getByTestId } = render(
    <SearchUsersScreen
      addUserContact={addUserContact}
      searchUsers={searchUsers}
      getUserContacts={getUserContacts}
      contacts={contacts}
      searching={true}
    />
  );
  fireEvent.changeText(getByTestId('SearchUserScreenBar'), '');
  fireEvent.press(getByTestId('SearchUserScreenButton'));
  expect(baseElement).toMatchSnapshot();
});

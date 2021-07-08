import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from './Profile';

/*
  We render the component
*/
test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <Profile
      user={{
        firstName: 'FirsName',
        lastName: 'lastName',
        username: 'Username',
        email: 'test@cern.ch',
        phone: "64446",
        mobile: "64445"
      }}
    />
  );

  expect(queryByTestId('Profile')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

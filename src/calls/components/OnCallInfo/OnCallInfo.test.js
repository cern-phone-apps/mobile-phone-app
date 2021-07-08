import React from 'react';
import { render } from '@testing-library/react-native';
import OnCallInfo from './OnCallInfo';

const phoneService = {
  sendDtmfCommand: jest.fn(() => {})
};

// THIS TEST LAUNCH A WARNING IN HIS CHILD COMPONENTS
test('Render the component', async () => {
  const { baseElement } = render(
    <OnCallInfo
      remote={{
          name: "Name",
          phoneNumber: "64446"
      }}
      phoneService={phoneService}
    />
  );
  expect(baseElement).toMatchSnapshot();
});

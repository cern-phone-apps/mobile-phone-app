import React from 'react';
import { render } from '@testing-library/react-native';
import CallForwardingBanner from './CallForwardingBanner';

test('Render the component', async () => {
  const { baseElement, queryByTestId } = render(
    <CallForwardingBanner
      callForwarding={{ 'simultaneous-ring': true, 'call-forwarding': true }}
    />
  );
  expect(queryByTestId('component')).not.toBeNull();
  expect(baseElement).toMatchSnapshot();
});

test('Not render the component', async () => {
  const { queryByTestId } = render(
    <CallForwardingBanner
      callForwarding={{ 'simultaneous-ring': false, 'call-forwarding': false }}
    />
  );
  expect(queryByTestId('component')).toBeNull();
});

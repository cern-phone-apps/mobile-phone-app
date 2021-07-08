import React from 'react';
import { render } from '@testing-library/react-native';
import RecentCallsMenu from './RecentCallsMenu';

const clearRecentCalls = jest.fn(() => {});

test('Render the component', async () => {
  const { baseElement } = render(
    <RecentCallsMenu clearRecentCalls={clearRecentCalls} />
  );
  expect(baseElement).toMatchSnapshot();
});

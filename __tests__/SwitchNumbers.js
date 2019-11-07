/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import SwitchNumbersScreen from '../src/calls/screens/SwitchNumbersScreen/SwitchNumbersScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(
    <SwitchNumbersScreen
      unregister={() => null}
      navigation={{ navigate: () => null }}
    />
  );
});

it('redirect to Register', () => {
  let navigate = false;
  renderer.create(
    <SwitchNumbersScreen
      unregister={() => null}
      navigation={{
        navigate: (to) => {
          navigate = to;
        }
      }}
    />
  );
  expect(navigate).toBe('Register');
});

it('Displays a redirecting message', () => {
  const rendered = renderer.create(
    <SwitchNumbersScreen
      unregister={() => null}
      navigation={{
        navigate: () => null
      }}
    />
  );
  const json = rendered.toJSON();
  expect(json.children[0]).toContain('Redirecting');
});

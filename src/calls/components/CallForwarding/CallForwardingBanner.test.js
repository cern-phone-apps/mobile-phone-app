/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import CallForwardingBanner from './CallForwardingBanner';

it('renders correctly', () => {
  const callForwardingConfig = {
    callForwarding: {
      'simultaneous-ring': false
    }
  };
  renderer.create(
    <CallForwardingBanner callForwarding={callForwardingConfig} />
  );
});

import React from 'react';
import expect, { createSpy } from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';

import LocationPermissionNotifier from '../LocationPermissionNotifier';

describe('LocationPermissionNotifier component', () => {
  it('executes onChange when the permission changes', () => {
    const spy = createSpy();
    const instance = renderIntoDocument(<LocationPermissionNotifier onChange={spy} />);
    setTimeout(() => {
      instance.permissionObject.onchange();
      expect(spy.calls.length).toBe(1);
    }, 100);
  });
});

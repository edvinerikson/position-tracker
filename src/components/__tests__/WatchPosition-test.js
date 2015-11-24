import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import expect, { createSpy, spyOn } from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('WatchPosition component', () => {
  let Comp = null;
  let watchPositionSpy = null;
  let clearWatchSpy = null;
  beforeEach(() => {
    watchPositionSpy = spyOn(navigator.geolocation, 'watchPosition');
    clearWatchSpy = spyOn(navigator.geolocation, 'clearWatch');
    Comp = require('../watchPosition');
  });

  afterEach(() => {
    watchPositionSpy.restore();
    clearWatchSpy.restore();
    Comp = null;
  });
  it('executes onChange when the position changes', () => {
    const spy = createSpy();
    watchPositionSpy.andCall((success) => {
      success();
    });
    renderIntoDocument(<Comp permission="granted" onChange={spy} />);
    expect(spy.calls.length).toBe(1);
  });

  it('clears the watchPosition handler when unmounting', () => {
    const container = document.createElement('div');
    render(<Comp permission="granted" />, container);
    expect(clearWatchSpy.calls.length).toBe(0);
    unmountComponentAtNode(container);
    expect(clearWatchSpy.calls.length).toBe(1);
  });

  it('executes watchPosition when permission is granted', () => {
    renderIntoDocument(<Comp permission="prompt" />); // should not execute watchPosition
    renderIntoDocument(<Comp permission="granted" />); // should execute watchPosition
    expect(watchPositionSpy.calls.length).toBe(1);
  });

  it('executes onError when it couldn\'t get the position', () => {
    const spy = createSpy();
    watchPositionSpy.andCall((success, error) => {
      error(new Error());
    });
    renderIntoDocument(<Comp permission="granted" onError={spy} />);
    expect(spy.calls.length).toBe(1);
  });
});

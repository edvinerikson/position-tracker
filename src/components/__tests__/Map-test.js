import React from 'react';
import expect from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';
import { GoogleMap } from 'react-google-maps';
import Map from '../Map';

describe('Map component', () => {
  it('exports a public method getGoogleMap', () => {
    const instance = renderIntoDocument(<Map center={{lat: 0, lng: 0}} user={{lat: 0, lng: 0}} />);
    expect(instance.getGoogleMap).toBeA(Function);
  });

  describe('getGoogleMap method', () => {
    it('returns an instance of the GoogleMap component', () => {
      const instance = renderIntoDocument(<Map center={{lat: 0, lng: 0}} user={{lat: 0, lng: 0}} />);
      setTimeout(() => {
        expect(instance.getGoogleMap()).toBeA(GoogleMap);
      }, 100);
    });
  });
});

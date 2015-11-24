/* globals API_KEY */
import React, { PropTypes } from 'react';
import ScriptLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import { GoogleMap, Marker, Circle } from 'react-google-maps';

import { getDistance } from '../utilities';

const Map = React.createClass({
  propTypes: {
    onClick: PropTypes.func,
    markers: PropTypes.arrayOf(Object),
    center: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onClickMarker: PropTypes.func,
  },
  getDefaultProps() {
    return {
      markers: [],
      onClickMarker: () => {},
    };
  },
  getGoogleMap() {
    return this._googleMap;
  },
  handleClick(evt) {
    if (this.props.onClick) this.props.onClick(evt);
  },
  render() {
    return (
      <div>
        <ScriptLoader
          protocol="https"
          hostname="maps.googleapis.com"
          pathname="/maps/api/js"
          query={{ key: API_KEY }}
          loadingElement={
            <p>Loading map...</p>
          }
          containerElement={<div style={{height: '100%'}} />}
          googleMapElement={
            <GoogleMap
              options={{
                maxZoom: 17,
                minZoom: 14,
                disableDoubleClickZoom: true,
                keyboardShortcuts: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              defaultZoom={15}
              defaultCenter={this.props.center}
              onClick={this.handleClick}
              ref={inst => {
                this._googleMap = inst;
              }}>
              {this.props.markers.map(({ id, lat, lng }) => {
                const distanceToUser = getDistance({ lat, lng }, this.props.user);
                const titleText = `Distance to your location: ${distanceToUser} meters`;
                return (
                  <Marker
                    key={id + 'marker'}
                    title={titleText}
                    onClick={() => this.props.onClickMarker(id)}
                    position={{ lat, lng }} />
                );
              })}
              {this.props.markers.map(({ id, lat, lng }) => {
                const distanceToUser = getDistance({ lat, lng }, this.props.user);
                const fillColor = distanceToUser <= 500 ? 'green' : 'red';
                return (
                  <Circle
                    key={id + 'circle'}
                    onClick={() => this.props.onClickMarker(id)}
                    options={{ fillColor }}
                    radius={500}
                    center={{ lat, lng }} />
                );
              })}
                <Marker title="You are here" position={this.props.user} />
            </GoogleMap>
          } />
      </div>
    );
  },
});

export default Map;

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import {
  addMarker,
  removeMarker,
  updateUserLocation,
  updateLocationPermission,
} from '../actions';
import { getDistance } from '../utilities';

import WatchPosition from '../components/WatchPosition';
import Map from '../components/Map';

const MapPage = React.createClass({
  propTypes: {
    markers: PropTypes.arrayOf(Object),
    locationPermission: PropTypes.string.isRequired,
    geoLocation: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    dispatch: PropTypes.func,
  },
  getInitialState() {
    return {
      isLocating: false,
    };
  },
  handleMapClick(evt) {
    const { dispatch } = this.props;
    const { lat, lng } = evt.latLng;
    dispatch(addMarker(/* generate id */undefined, lat(), lng()));
  },
  handleMarkerClick(markerId) {
    const { dispatch } = this.props;
    dispatch(removeMarker(markerId));
  },
  handleClearMarkersClick() {
    const { dispatch } = this.props;
    const markersToClear = this.props.markers.filter(({ lat, lng }) => getDistance({ lat, lng }, this.props.geoLocation) <= 500);
    markersToClear.forEach(({ id }) => dispatch(removeMarker(id)));
  },
  handlePositionChange(location) {
    const { dispatch } = this.props;
    const { latitude, longitude } = location.coords;
    dispatch(updateUserLocation(latitude, longitude));
  },
  handlePositionError(error) {
    console.log(error); // eslint-disable-line no-console
  },
  handleGrantAccess() {
    if (!this.state.isLocating) {
      this.setState({isLocating: true});
      navigator.geolocation.getCurrentPosition(() => {
        this.setState({isLocating: false});
        if (this.props.locationPermission === 'prompt') {
          this.props.dispatch(updateLocationPermission('granted'));
        }
      });
    }
  },
  render() {
    return (
      <div>
        {(() => {
          switch (this.props.locationPermission) {
          case 'prompt':
            return (
              <div className="container">
                <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
                  <h1 className="text-center">Permissions</h1>
                  <p className="text-center">For you to be able to use this app you will need to grant us access to your location.</p>
                  <button onClick={this.handleGrantAccess} className="btn btn-primary center-block">{this.state.isLocating ? 'Locating..' : 'Okay'}</button>
                </div>
              </div>
            );
          case 'granted':
            return (
              <div>
                {this.props.geoLocation ? <Map
                  user={this.props.geoLocation}
                  center={this.props.geoLocation}
                  markers={this.props.markers}
                  onClickMarker={this.handleMarkerClick}
                  onClick={this.handleMapClick} /> :
                   (
                     <div className="container">
                       <div className="col-md-4 col-md-offset-4">
                         <h1 className="text-center">Locating...</h1>
                       </div>
                     </div>
                   )
                }

                {/* this.props.geoLocation && this.props.markers.every(({ lat, lng }) => getDistance({ lat, lng }, this.props.geoLocation) >= 500) ?
                  <Map
                    user={this.props.geoLocation}
                    center={this.props.geoLocation}
                    markers={this.props.markers}
                    onClickMarker={this.handleMarkerClick}
                    onClick={this.handleMapClick} />
                  : (() => {
                    if (this.props.markers.some(({ lat, lng }) => getDistance({ lat, lng }, this.props.geoLocation) <= 500)) {
                      return (
                        <div className="container">
                          <div className="col-md-4 col-md-offset-4">
                            <h2 className="text-center">Within the area</h2>
                            <p className="text-center">You are within 500 meters to a marker...</p>
                            <button onClick={this.handleClearMarkersClick} className="btn btn-primary btn-block center-block">Clear markers within 500 meters...</button>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="container">
                        <div className="col-md-4 col-md-offset-4">
                          <h1 className="text-center">Locating...</h1>
                        </div>
                      </div>
                    );
                  })()*/}
                <WatchPosition
                  options={{enableHighAccuracy: true, maximumAge: 10000}}
                  permission={this.props.locationPermission}
                  onChange={this.handlePositionChange}
                  onError={this.handlePositionError} />
              </div>
            );
          default:
            return (
              <div className="container">
                <div className="col-md-4 col-md-offset-4">
                  <h1 className="text-center">Permission denied</h1>
                  <p className="text-center">You have denied us access to your location. If you ever change your mind you can still give us access by clicking the "location" icon in the address bar or enable it in the settings.</p>
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  },
});

function mapStateToProps(state) {
  const props = {
    markers: state.map.markers,
    locationPermission: state.user.location.permission,
  };
  if (state.user.location.lat && state.user.location.lng) {
    props.geoLocation = {
      lat: state.user.location.lat,
      lng: state.user.location.lng,
    };
  }
  return props;
}

export default connect(mapStateToProps, (dispatch) => ({ pushState, dispatch }))(MapPage);

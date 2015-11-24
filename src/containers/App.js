import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateLocationPermission } from '../actions';
import LocationPermissionNotifier from '../components/LocationPermissionNotifier';

const App = React.createClass({
  propTypes: {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
  },
  handlePermissionChange(state) {
    this.props.dispatch(updateLocationPermission(state));
  },
  render() {
    return (
      <div>
        {this.props.children}
        <LocationPermissionNotifier onChange={this.handlePermissionChange} />
      </div>
    );
  },
});

export default connect()(App);

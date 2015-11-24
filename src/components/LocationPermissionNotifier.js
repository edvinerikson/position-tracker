import React, { PropTypes } from 'react';

const LocationPermissionNotifier = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
  },
  componentWillMount() {
    navigator.permissions.query({name: 'geolocation'}).then(permissionObject => {
      this.props.onChange(permissionObject.state);
      this.permissionObject = permissionObject;
      this.permissionObject.onchange = this.handlePermissionChange;
    });
  },
  componentWillUnmount() {
    if (this.permissionObject) this.permissionObject.onchange = null;
  },
  handlePermissionChange({ target: { state }}) {
    this.props.onChange(state);
  },
  render() {
    return <span style={{display: 'none'}} />;
  },
});

export default LocationPermissionNotifier;

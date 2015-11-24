import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const WatchPosition = React.createClass({
  propTypes: {
    onChange: PropTypes.func,
    onError: PropTypes.func,
    permission: PropTypes.string.isRequired,
    options: PropTypes.object,
  },
  getDefaultProps() {
    return {
      options: {},
    };
  },
  componentWillMount() {
    if (this.props.permission === 'granted') {
      this.watch = navigator.geolocation.watchPosition(
        this.handlePositionChange,
        this.handlePositionError,
        this.props.options
      );
    }
  },
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watch);
  },
  componentWillReciveProps(nextProps) {
    if (
      nextProps.permission === 'granted' &&
      (this.watch === undefined || !shallowCompare(nextProps.options, this.props.options))
    ) {
      if (this.watch) navigator.geolocation.clearWatch(this.watch);
      this.watch = navigator.geolocation.watchPosition(
        this.handlePositionChange,
        this.handlePositionError,
        nextProps.options
      );
    } else {
      if (this.watch) navigator.geolocation.clearWatch(this.watch);
    }
  },
  handlePositionChange(location) {
    if (this.props.onChange) this.props.onChange(location);
  },
  handlePositionError(error) {
    if (this.props.onError) this.props.onError(error);
  },
  render() {
    return <span style={{display: 'none'}} />;
  },
});

export default WatchPosition;

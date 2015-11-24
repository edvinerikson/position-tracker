import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import DevTools from './DevTools';

const Root = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
  },
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <ReduxRouter />
          <DevTools />
        </div>
      </Provider>
    );
  },
});

export default Root;

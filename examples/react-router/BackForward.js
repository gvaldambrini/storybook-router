import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { Route, Link } from 'react-router-dom';

import StoryRouter from 'storybook-react-router';

const ChildLocation = ({ location }) => (
  <div>
    <h3>Location: {location.pathname}</h3>
  </div>
);

ChildLocation.propTypes = {
  location: PropTypes.object,
};

const ComponentBackForward = () => (
  <div>
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
    </ul>
    <Route
      render={({ history }) => <button onClick={history.goBack}>Back</button>}
    />
    <Route
      render={({ history }) => (
        <button onClick={history.goForward}>Forward</button>
      )}
    />
    <Route component={ChildLocation} />
  </div>
);

storiesOf('BackForward', module)
  .addDecorator(StoryRouter())
  .add('back & forward', () => <ComponentBackForward />);

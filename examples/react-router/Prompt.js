import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { Route, Link, Prompt } from 'react-router-dom';

import StoryRouter from 'storybook-react-router';

const ChildLocation = ({ location }) => (
  <div>
    <h3>Location: {location.pathname}</h3>
  </div>
);

ChildLocation.propTypes = {
  location: PropTypes.object,
};

const ComponentPrompt = () => (
  <div>
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
    </ul>
    <Prompt
      message={location => {
        if (location.pathname === '/settings') {
          return `Are you sure you want to go to ${location.pathname}?`;
        }
        return true;
      }}
    />
    <Route component={ChildLocation} />
  </div>
);

storiesOf('Prompt', module)
  .addDecorator(
    StoryRouter(
      {},
      { getUserConfirmation: (message, cb) => cb(window.confirm(message)) }
    )
  )
  .add('prompt', () => <ComponentPrompt />);

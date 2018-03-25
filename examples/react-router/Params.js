import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { Route, Link } from 'react-router-dom';

import StoryRouter from 'storybook-react-router';

const ChildId = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);

ChildId.propTypes = {
  match: PropTypes.object,
};

const ComponentParams = () => (
  <div>
    <ul>
      <li>
        <Link to="/accounts/netflix">Netflix</Link>
      </li>
      <li>
        <Link to="/accounts/sky">Sky</Link>
      </li>
    </ul>
    <Route path="/accounts/:id" component={ChildId} />
  </div>
);

storiesOf('Params', module)
  .addDecorator(StoryRouter())
  .add('params', () => <ComponentParams />);

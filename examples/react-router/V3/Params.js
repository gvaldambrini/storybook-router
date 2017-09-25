import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { Route, Link } from 'react-router';

import StoryRouter from 'storybook-router';

const ChildId = ({params}) => (
  <div>
    <h3>ID: {params.id}</h3>
  </div>
);

ChildId.propTypes = {
  params: PropTypes.object
};

const ComponentParams = (props) => (
  <div>
    <ul>
      <li><Link to="/accounts/netflix">Netflix</Link></li>
      <li><Link to="/accounts/sky">Sky</Link></li>
    </ul>
    {props.children}
  </div>
);

ComponentParams.propTypes = {
  children: PropTypes.element
};

const routes = (
  <Route path='/' component={ComponentParams}>
    <Route path="/accounts/:id" component={ChildId}/>
  </Route>
);

storiesOf('Params', module)
  .addDecorator(StoryRouter({}, {autoRoute: false}))
  .add('params', () => routes);

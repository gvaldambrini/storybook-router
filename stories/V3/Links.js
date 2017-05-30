import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { IndexLink, Link, Route, IndexRoute } from 'react-router';

// In a project that uses 'storybook-router' from npm, use
// import StoryRouter from 'storybook-router';
import StoryRouter from '../../src/StoryRouter';


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const ACTIVE = {fontWeight: 'bold'};

const ComponentLinks = (props) => (
  <div>
    <ul>
      <li>
        <IndexLink activeStyle={ACTIVE} activeClassName="active" to="/">
          Home
        </IndexLink>
      </li>
      <li>
        <Link activeStyle={ACTIVE} activeClassName="active" to="/about">
          About
        </Link>
      </li>
    </ul>
    <hr/>
    {props.children}
  </div>
);

ComponentLinks.propTypes = {
  children: PropTypes.element
};

const routes = (
  <Route path='/' component={ComponentLinks}>
    <Route path='about' component={About} />
    <IndexRoute component={Home}/>
  </Route>
);

storiesOf('Linked stories', module)
  .addDecorator(StoryRouter(
    {'/about': linkTo('Linked stories', 'about')},
    {initialEntry: ['/'], autoRoute: false}))
  .add('home', () => routes);

storiesOf('Linked stories', module)
  .addDecorator(StoryRouter(
    {'/': linkTo('Linked stories', 'home')},
    {initialEntry: ['/about'], autoRoute: false}))
  .add('about', () => routes);

storiesOf('Links with local navigation', module)
  .addDecorator(StoryRouter({}, {autoRoute: false}))
  .add('home', () => routes);

storiesOf('Linked stories with automatic route definition', module)
  .addDecorator(StoryRouter({
    '/about': linkTo('Linked stories with automatic route definition', 'about')
  }))
  .add('home', () => <ComponentLinks/>);

storiesOf('Linked stories with automatic route definition', module)
  .addDecorator(StoryRouter({
    '/': linkTo('Linked stories with automatic route definition', 'home')
  }, {initialEntry: ['/about']}))
  .add('about', () => <ComponentLinks/>);

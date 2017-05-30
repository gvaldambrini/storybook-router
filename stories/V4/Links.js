import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Route, Link } from 'react-router-dom';

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

const ComponentLinks = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <hr/>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
  </div>
);

storiesOf('Linked stories', module)
  .addDecorator(StoryRouter(
    {'/about': linkTo('Linked stories', 'about')}))
  .add('home', () => (
    <ComponentLinks/>
  ));

storiesOf('Linked stories', module)
  .addDecorator(StoryRouter(
    {'/': linkTo('Linked stories', 'home')},
    {initialEntries: ['/about']}))
  .add('about', () => (
    <ComponentLinks/>
  ));

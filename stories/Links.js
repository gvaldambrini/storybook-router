import React from 'react';

import { storiesOf, linkTo } from '@kadira/storybook';
import { Route, Link } from 'react-router-dom';

// In a project that uses 'storybook-router' from npm, use
// import StoryRouter from 'storybook-router';
import StoryRouter from '../src/StoryRouter';


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

storiesOf('Links', module)
  .addDecorator(StoryRouter(
    {'/about': linkTo('Links', 'about')}))
  .add('home', () => (
    <ComponentLinks/>
  ));

storiesOf('Links', module)
  .addDecorator(StoryRouter(
    {'/': linkTo('Links', 'home')},
    {initialEntries: ['/about']}))
  .add('about', () => (
    <ComponentLinks/>
  ));

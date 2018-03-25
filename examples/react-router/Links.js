import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Route, Link } from 'react-router-dom';

import StoryRouter from 'storybook-react-router';

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

const Article = ({ match }) => (
  <div>
    <h2>Article: {match.params.id}</h2>
  </div>
);

Article.propTypes = {
  match: PropTypes.object.isRequired,
};

const ComponentLinks = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/articles/1">First Article</Link>
      </li>
    </ul>
    <hr />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/articles/:id" component={Article} />
  </div>
);

storiesOf('Linked stories', module)
  .addDecorator(
    StoryRouter({
      '/about': linkTo('Linked stories', 'about'),
      '/articles/*': linkTo('Linked stories', 'article'),
    })
  )
  .add('home', () => <ComponentLinks />);

storiesOf('Linked stories', module)
  .addDecorator(
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'home'),
        '/articles/*': linkTo('Linked stories', 'article'),
      },
      { initialEntries: ['/about'] }
    )
  )
  .add('about', () => <ComponentLinks />);

storiesOf('Linked stories', module)
  .addDecorator(
    StoryRouter(
      {
        '/': linkTo('Linked stories', 'home'),
        '/about': linkTo('Linked stories', 'about'),
      },
      { initialEntries: ['/articles/1'] }
    )
  )
  .add('article', () => <ComponentLinks />);

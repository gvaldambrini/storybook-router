import React from 'react';

import { storiesOf } from '@storybook/react';
import { Link, withRouter } from 'react-router';

import StoryRouter from 'storybook-router';

const BackButton = withRouter(
  props => <button onClick={props.router.goBack}>Back</button>
);

const ForwardButton = withRouter(
  props => <button onClick={props.router.goForward}>Forward</button>
);

const ComponentBackForward = () => (
  <div>
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/">Home</Link></li>
    </ul>
    <BackButton/>
    <ForwardButton/>
  </div>
);

storiesOf('BackForward', module)
  .addDecorator(StoryRouter())
  .add('back & forward', () => <ComponentBackForward/>);
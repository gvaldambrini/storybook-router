# storybook-router

A [storybook](https://storybooks.js.org/) decorator that allows you to integrate [react-router v.4](https://reacttraining.com/react-router/) components in your stories.

## Install

    npm install --save-dev storybook-router

## Getting started

You can now import the decorator and use it in your stories, everytime you want to write a story for a component which uses a react-router `Route` or `Link` (or directly the `history` object):

```js
import React from 'react';

import { storiesOf, linkTo } from '@kadira/storybook';
import { Route, Link } from 'react-router-dom';

import StoryRouter from 'storybook-router';

const ChildId = ({match}) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);

const ComponentParams = () => (
  <div>
    <ul>
      <li><Link to="/accounts/netflix">Netflix</Link></li>
      <li><Link to="/accounts/sky">Sky</Link></li>
    </ul>
    <Route path="/accounts/:id" component={ChildId}/>
  </div>
);

storiesOf('Params', module)
  .addDecorator(StoryRouter())
  .add('params', () => (
    <ComponentParams/>
  ));
```

The decorator is actually an HOC which wraps the react-router `MemoryRouter`component and accepts two optional arguments. The default behavior is to log the [history method](https://github.com/ReactTraining/history#navigation) called behind the scene by react-router using the [storybook action logger](https://github.com/storybooks/storybook/tree/master/packages/addon-actions).

### StoryRouter arguments

The **first argument** is an object that you can use to extend the default behavior.
Every time that a key in the object matches with a path Storybook will call the callback specified for the corresponding value with the destination path as argument.
This way you can for example link stories together using the [`linkto` function](https://storybooks.js.org/docs/react-storybook/basics/writing-stories).
The match of a path is performed using the [path-to-regexp module](https://www.npmjs.com/package/path-to-regexp) so you can also use parameter names and regexp within the link keys.

The **second argument** is another object which will be forwarded to the wrapped `MemoryRouter` as [props](https://reacttraining.com/react-router/web/api/MemoryRouter). This allows you to write stories having a specific url location or using advanced functionalities as asking the user confirmation before exiting from a location.

```js
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
```


You can find more in the provided [example stories](https://github.com/gvaldambrini/storybook-router/tree/master/stories).

### Limitations

As the wrapped MemoryRouter creates a new history object for each story you cannot pass the history from a story to  another one and so you cannot implement a back or forward button which works among stories.

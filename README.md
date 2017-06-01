# storybook-router

A [Storybook](https://storybook.js.org/) decorator that allows you to integrate [react-router](https://reacttraining.com/react-router/) components in your stories. The decorator currently supports react-router v3 and v4, with few small differences (see below).

## Install

    npm install --save-dev storybook-router

Please note that if you are using the old version of Storybook from the kadira organization (not recommended) the last version you can use is the 0.2.3:

    npm install --save-dev storybook-router@0.2.3

## Basic usage
The `StoryRouter` decorator is actually an HOC which wraps the react-router `Router` component and accepts two optional arguments. The default behavior is to log the [history method](https://github.com/ReactTraining/history#navigation) called behind the scene by react-router using the [storybook action logger](https://github.com/storybooks/storybook/tree/master/addons/actions).

You can add globally the `StoryRouter` decorator if you are just fine with the default arguments, however if you want to link stories or you want to provide a custom route configuration object for your story (only with react-router v3) you need to add the decorator locally.

### A simple example with react-router v4

Suppose you have a component that uses react-router `Route` and `Link`:

```js
import React from 'react';
import { Route, Link } from 'react-router-dom';

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

export default ComponentParams;
```

you can add the `StoryRouter` decorator to your story this way:

```js
import { storiesOf } from '@kadira/storybook';
import StoryRouter from 'storybook-router';

import ComponentParams from '<your_component_path>/ComponentParams';

storiesOf('Params', module)
  .addDecorator(StoryRouter())
  .add('params', () => (
    <ComponentParams/>
  ));
```

### A simple example with react-router v3

Suppose you have a navbar like component with `Link`, `IndexLink` and active classnames:
```js
import React from 'react';
import { IndexLink, Link } from 'react-router';

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

export default ComponentLinks;
```

you can add the `StoryRouter` decorator to your story this way:

```js
import { storiesOf } from '@kadira/storybook';
import StoryRouter from 'storybook-router';

import ComponentLinks from '<your_component_path>/ComponentLinks';

storiesOf('Links', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <ComponentLinks/>
  ));
```

## StoryRouter arguments

The **first argument** is an object that you can use to extend the default behavior.
Every time that a key in the object matches with a path Storybook will call the callback specified for the corresponding value with the destination path as argument.
This way you can for example link stories together using the [`links` addons](https://github.com/storybooks/storybook/tree/master/addons/links) with the linkTo function.

With react-router v3 the link keys need to be equal (`===`) to the history location of the performed action, with react-router v4 the match is performed using the [path-to-regexp module](https://www.npmjs.com/package/path-to-regexp) so you can also use parameter names and regexp within the link keys.

The **second argument** is another object that depends on which version of react-router you are using.

With react-router v3 you can specify the following object properties:
 * initialEntry, the starting history location [default `'/'`]
 * autoRoute, a boolean flag you can use to allow or disallow the automatic route configuration [default `true`]

As usually Storybook is used to render _dumb_ components, `StoryRouter` provides an automatic route configuration, which is a single route that renders the story. You can disable this feature and provides a route configuration object for the story setting `autoRoute` to `false`.

With react-router v4 the object will be forwarded to the wrapped `MemoryRouter` as [props](https://reacttraining.com/react-router/web/api/MemoryRouter). This allows you to write stories having a specific url location or using advanced functionalities as asking the user confirmation before exiting from a location.

### Advanced usage and examples
You can find more examples in the provided stories for [react-router v3](https://github.com/gvaldambrini/storybook-router/tree/master/stories/V3) and [react-router v4](https://github.com/gvaldambrini/storybook-router/tree/master/stories/V4).

### Limitations

As the wrapped Router creates a new history object for each story you cannot pass the history from a story to  another one and so you cannot implement a back or forward button which works among stories.

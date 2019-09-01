# storybook-router

A [Storybook](https://storybook.js.org/) decorator that allows you to use your routing-aware components.

## Install

    npm install --save-dev storybook-react-router

## The StoryRouter decorator
The decorator is actually a function which wraps the `Router` instance. It accepts two optional arguments that you can use if you want to build a prototype of your navigation within storybook or if you need more control over the router itself.

In its default behavior the decorator just log every route action perfomed using the [storybook action logger](https://github.com/storybooks/storybook/tree/master/addons/actions). If you are fine with the default arguments you can add globally the `StoryRouter` decorator, however if you need to specify some of the arguments you have to use the decorator for every story that needs it.

## Usage

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
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import ComponentParams from '<your_component_path>/ComponentParams';

storiesOf('Params', module)
  .addDecorator(StoryRouter())
  .add('params', () => (
    <ComponentParams/>
  ));
```

If you want to use `StoryRouter` in all your stories, you can also add it globally by editing your Storybook `config.js` file:

```js
import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());

// ...your config

```

The important thing is to call `addDecorator` before calling `configure`, otherwise it will not work!

## StoryRouter arguments

The **first argument** is an object that you can use to extend the default behavior.
Every time that a key in the object matches with a path Storybook will call the callback specified for the corresponding value with the destination path as argument.
This way you can for example link stories together using the [`links` addons](https://github.com/storybooks/storybook/tree/master/addons/links) with the linkTo function.

The match is performed using the [path-to-regexp module](https://www.npmjs.com/package/path-to-regexp) so you can also use parameter names and regexp within the link keys.

The **second argument** is another object which will be forwarded to the wrapped `MemoryRouter` as [props](https://reacttraining.com/react-router/web/api/MemoryRouter). This allows you to write stories having a specific url location or using advanced functionalities as asking the user confirmation before exiting from a location.

## Advanced usage and examples
You can find more examples in the provided [stories](https://github.com/gvaldambrini/storybook-router/tree/master/examples/react-router).
You can run them cloning this repository and executing (supposing you have installed globally [lerna](https://github.com/lerna/lerna)):

    yarn install && yarn bootstrap
    yarn storybook-react-examples

## Limitations

As the wrapped Router creates a new history object for each story you cannot pass the history from a story to  another one and so you cannot implement a back or forward button which works among stories.

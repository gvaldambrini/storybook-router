# storybook-router

A [Storybook](https://storybook.js.org/) decorator that allows you to use your routing-aware components. You can simply use the library _link_ component within your story or you can write a real prototype of your application using `StoryRouter` in conjunction with the [story links addon](https://github.com/storybooks/storybook/tree/master/addons/links).

The decorator currently supports [react-router](https://reacttraining.com/react-router/) v3 / v4 and [vue-router](https://router.vuejs.org/en/) v2.

## Install

    npm install --save-dev storybook-router

## The StoryRouter decorator
The decorator is actually a function which wraps the `Router` / `VueRouter` instance. It accepts two optional arguments that you can use if you want to build a prototype of your navigation within storybook or if you need more control over the router itself. For details, please refer to the specific documentation for [using with react-router](#usage-with-react-router) or [using with vue-router](#usage-with-vue-router).

In its default behavior the decorator just log every routing action perfomed using the [storybook action logger](https://github.com/storybooks/storybook/tree/master/addons/actions). If you are fine with the default arguments you can add globally the `StoryRouter` decorator, however if you need to specify some of the arguments you have to use the decorator in every story that needs it.

## Usage with react-router

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
import { storiesOf } from '@storybook/react';
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
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import ComponentLinks from '<your_component_path>/ComponentLinks';

storiesOf('Links', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <ComponentLinks/>
  ));
```

### StoryRouter arguments

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
You can find more examples in the provided stories for [react-router v3](https://github.com/gvaldambrini/storybook-router/tree/master/examples/react-router/V3) and [react-router v4](https://github.com/gvaldambrini/storybook-router/tree/master/examples/react-router/V4).

### Limitations

As the wrapped Router creates a new history object for each story you cannot pass the history from a story to  another one and so you cannot implement a back or forward button which works among stories.

## Usage with vue-router

Suppose you have a navigation bar that uses the vue-router `router-link`:
```js
const NavBar = {
  template: `
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>`
};
```
you can define a story for your component just like this:

```js
storiesOf('NavBar', module)
  .addDecorator(StoryRouter())
  .add('default', () => NavBar);
```

or if you want to include in your story the target components (with a local navigation) you can write:
```js
const Home = {
  template: '<div>Home</div>'
};

const About = {
  template: '<div>About</div>'
};

storiesOf('Navigation', module)
  .addDecorator(StoryRouter({}, {
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]}))
  .add('local', () => ({
    components: { NavBar },
    template: `
      <div>
        <nav-bar/>
        <router-view/>
      </div>`
  }));
```

### StoryRouter arguments

The **first argument** is an object that you can use to extend the default behavior.
Every time that a key in the object matches with a path Storybook will call the callback specified for the corresponding value with the destination path as argument.
This way you can for example link stories together using the [`links` addons](https://github.com/storybooks/storybook/tree/master/addons/links) with the linkTo function.
The link keys need to be equal (`===`) to the fullPath of the destination route.

The **second argument** is another object you can use to specify one of the [vue-router constructor options](https://router.vuejs.org/en/api/options.html) plus a couple of specific `StoryRouter` options:
 * initialEntry, the starting location [default `'/'`]
 * globalBeforeEach, a function which will be installed as a [global beforeEach guard](https://router.vuejs.org/en/advanced/navigation-guards.html)


### Advanced usage and examples

You can find more examples in the [provided stories](https://github.com/gvaldambrini/storybook-router/tree/master/examples/vue-router).

### Limitations

As the wrapped VueRouter uses the browser history API which is quite limited (for example, it is not possible to reset the history stack) the same limitations apply to the `StoryRouter` decorator.

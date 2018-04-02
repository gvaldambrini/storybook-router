# storybook-router

A [Storybook](https://storybook.js.org/) decorator that allows you to use your routing-aware components. 

## Install

    npm install --save-dev storybook-vue-router

## The StoryRouter decorator
The decorator is actually a function which wraps the `VueRouter` instance. It accepts two optional arguments that you can use if you want to build a prototype of your navigation within storybook or if you need more control over the router itself. 

In its default behavior the decorator just log every route action perfomed using the [storybook action logger](https://github.com/storybooks/storybook/tree/master/addons/actions). If you are fine with the default arguments you can add globally the `StoryRouter` decorator, however if you need to specify some of the arguments you have to use the decorator for every story that needs it.

## Usage

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
import { storiesOf } from '@storybook/vue';
import StoryRouter from 'storybook-vue-router';

storiesOf('NavBar', module)
  .addDecorator(StoryRouter())
  .add('default', () => NavBar);
```

or if you want to include in your story the target components (with a local navigation) you can write:
```js
import { storiesOf } from '@storybook/vue';
import StoryRouter from 'storybook-vue-router';

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

## StoryRouter arguments

The **first argument** is an object that you can use to extend the default behavior.
Every time that a key in the object matches with a path Storybook will call the callback specified for the corresponding value with the destination path as argument.
This way you can for example link stories together using the [`links` addons](https://github.com/storybooks/storybook/tree/master/addons/links) with the linkTo function.
The link keys need to be equal (`===`) to the fullPath of the destination route.

The **second argument** is another object you can use to specify one of the [vue-router constructor options](https://router.vuejs.org/en/api/options.html) plus a couple of specific `StoryRouter` options:
 * initialEntry, the starting location [default `'/'`]
 * globalBeforeEach, a function which will be installed as a [global beforeEach guard](https://router.vuejs.org/en/advanced/navigation-guards.html)


## Advanced usage and examples

You can find more examples in the provided [stories](https://github.com/gvaldambrini/storybook-router/tree/master/examples/vue-router).
You can run them cloning this repository and executing (supposing you have installed globally [lerna](https://github.com/lerna/lerna)):

    npm install && npm run bootstrap
    npm run storybook-vue-examples

## Limitations

As the wrapped VueRouter uses the browser history API which is quite limited (for example, it is not possible to reset the history stack) the same limitations apply to the `StoryRouter` decorator.

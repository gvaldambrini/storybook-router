import { storiesOf } from '@storybook/vue';
import { linkTo } from '@storybook/addon-links';

import StoryRouter from 'storybook-vue-router';

const TargetComponent = {
  template: '<div>The target component</div>',
};

storiesOf('Links', module).add('target story', () => TargetComponent);

storiesOf('Links', module)
  .addDecorator(StoryRouter({ '/target': linkTo('Links', 'target story') }))
  .add('standard router-link', () => ({
    template: `
      <div>
        <router-link to="/target">String Link</router-link>
        <router-link v-bind:to="'target'">Javascript link</router-link>
      </div>`,
  }))
  .add('button with function', () => ({
    template:
      '<button v-on:click="goToTargetStory">Button With Function</button>',
    methods: {
      goToTargetStory: function() {
        this.$router.push('/target');
      },
    },
  }));

storiesOf('Links', module)
  .addDecorator(
    StoryRouter(
      { '/component': linkTo('Links', 'target story') },
      {
        routes: [
          {
            path: '/component',
            name: 'comp',
            component: TargetComponent,
          },
        ],
      }
    )
  )
  .add('named route', () => ({
    template: `<router-link :to="{name: 'comp'}">Named link</router-link>`,
  }));

storiesOf('Links', module)
  .addDecorator(
    StoryRouter(
      { '/target': linkTo('Links', 'target story') },
      {
        routes: [{ path: '/anothertarget', redirect: '/target' }],
      }
    )
  )
  .add('router-link with redirect', () => ({
    template: `
      <div>
        <router-link to="/anothertarget">Link to a redirected target</router-link>
      </div>`,
  }));

storiesOf('Links', module)
  .addDecorator(
    StoryRouter(
      { '/base/inner': linkTo('Links', 'target story') },
      { initialEntry: '/base' }
    )
  )
  .add('router-link relative path', () => ({
    template: `<router-link to="inner" append>A relative path Link</router-link>`,
  }));

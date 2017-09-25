import { storiesOf } from '@storybook/vue';

import StoryRouter from 'storybook-router';

const Home = {
  template: '<div>Home</div>'
};

const About = {
  template: '<div>About</div>'
};

const NavBar = {
  template: `
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>`
};

storiesOf('Navigation', module)
  .addDecorator(StoryRouter({}, {
    initialEntry: '/about',
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


const User = {
  template: '<div>User {{ $route.params.id }}</div>'
};

storiesOf('Navigation', module)
  .addDecorator(StoryRouter({}, {
    routes: [
      { path: '/user/:id', component: User }
    ]
  }))
  .add('dynamic route', () => ({
    template: `
      <div>
        <div>
          <router-link to="/user/123">User</router-link>
        </div>
        <router-view/>
      </div>
      `,
  }));

const UserComponent = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>`
};

const UserHome = {
  template: '<div>Home</div>'
};

const UserProfile = {
  template: '<div>Profile</div>'
};

const UserPosts = {
  template: '<div>Posts</div>'
};

storiesOf('Navigation', module)
  .addDecorator(StoryRouter({}, {
    routes: [
      { path: '/user/:id', component: UserComponent,
        children: [
          { path: '', component: UserHome },
          { path: 'profile', component: UserProfile },
          { path: 'posts', component: UserPosts }
        ]
      }
    ]
  }))
  .add('nested route', () => ({
    template: `
      <div>
        <div>
          <router-link to="/user/foo">/user/foo</router-link>
          <router-link to="/user/foo/profile">/user/foo/profile</router-link>
          <router-link to="/user/foo/posts">/user/foo/posts</router-link>
        </div>
        <router-view/>
      </div>
      `,
  }));

const ChildComponent = {
  template: '<h3>Path: {{$route.fullPath}}</h3>'
};

storiesOf('Navigation', module)
  .addDecorator(StoryRouter({}, {
    routes: [
      { path: '*', component: ChildComponent }
    ]
  }))
  .add('back & forward', () => ({
    template: `
      <div>
        <ul>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
          <li><router-link to="/">Home</router-link></li>
        </ul>
        <button v-on:click="goBack">Back</button>
        <button v-on:click="goForward">Forward</button>
        <router-view/>
      </div>`,
    methods: {
      // As the back & forward methods are from the browser history API that does not
      // allow to clear or block the navigation these methods can also change the
      // selected story.
      goBack: function() {
        this.$router.back();
      },
      goForward: function() {
        this.$router.forward();
      },
    },
  }));

import { storiesOf } from '@storybook/vue';

import StoryRouter from 'storybook-vue-router';

const About = {
  template: '<h1>About</h1>',
};

const Dashboard = {
  template: '<h1>Dashboard</h1>',
};

const Auth = {
  loggedIn: false,
  login: function() {
    this.loggedIn = true;
  },
  logout: function() {
    this.loggedIn = false;
  },
};

const Login = {
  template: '<input type="submit" value="Login" v-on:click="login">',
  methods: {
    login: function() {
      Auth.login();
      this.$router.push(this.$route.query.redirect);
    },
  },
};

const globalBeforeEach = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
};

storiesOf('Authentication', module)
  .addDecorator(
    StoryRouter(
      {},
      {
        routes: [
          { path: '/about', component: About },
          {
            path: '/dashboard',
            component: Dashboard,
            meta: { requiresAuth: true },
          },
          { path: '/login', component: Login },
        ],
        globalBeforeEach,
        initialEntry: '/about',
      }
    )
  )
  .add('with global guard', () => ({
    template: `
      <div>
        <p>
          <router-link to="/about">About</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
        </p>
        <router-view></router-view>
      </div>`,
  }));

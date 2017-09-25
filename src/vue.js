import VueRouter from 'vue-router';
import Vue from 'vue';

import { action } from '@storybook/addon-actions';

Vue.use(VueRouter);

const storyRouterDecorator = (links = {}, routerProps = {}) => {
  return story => {
    const router = new VueRouter(routerProps);
    router.replace(routerProps.initialEntry ? routerProps.initialEntry : '/');

    if (routerProps.globalBeforeEach) {
      router.beforeEach(routerProps.globalBeforeEach);
    }

    router.afterEach(to => {
      for (const link in links) {
        if (to.fullPath === link) {
          links[link](to.fullPath);
          return;
        }
      }
      action('router action')(to.fullPath);
    });

    const WrappedComponent = story();
    return Vue.extend({
      router,
      components: { WrappedComponent },
      template: '<wrapped-component/>',
      beforeDestroy: function() {
        // remove the afterEach callback from the router list to not
        // accumulate callbacks called for every route action (in practice
        // this means that without this the action is executed as many
        // times as the VueRouter instance has been created)
        this.$options.router.afterHooks = [];
      },
    });
  };
};

export default storyRouterDecorator;
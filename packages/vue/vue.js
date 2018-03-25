import VueRouter from 'vue-router';
import Vue from 'vue';

import { action } from '@storybook/addon-actions';

Vue.use(VueRouter);

const storyRouterDecorator = (links = {}, routerProps = {}) => {
  return story => {
    const router = new VueRouter(routerProps);
    router.replace(routerProps.initialEntry ? routerProps.initialEntry : '/');

    const getLocation = location => {
      // The location can be a simple string if you are using directly one of the
      // Router methods (https://router.vuejs.org/en/api/router-instance.html#methods)
      // or it can be an object, having the name or the path depending if you
      // are using named routes or not.
      if (typeof location === 'object') {
        return location.path ? location.path : `name: ${location.name}`;
      }
      return location;
    };

    let replaced;

    // We want to log every action performed on the navigation router with the only
    // exception of links replaced with the linkTo callback.
    // Unfortunately VueRouter does not perform any action if the target route is
    // the same of the current one (see the code at the url https://goo.gl/gGVxzq).
    // Replacing the original push / replace router methods workaround the issue
    // with the assumption that the afterEach global guard is called from those
    // methods.
    const originalPush = router.push.bind(router);

    router.push = (location, success, abort) => {
      replaced = false;
      originalPush(location, success, abort);

      if (!replaced) {
        action('PUSH')(getLocation(location));
      }
    };

    const originalReplace = router.replace.bind(router);

    router.replace = (location, success, abort) => {
      replaced = false;
      originalReplace(location, success, abort);

      if (!replaced) {
        action('REPLACE')(getLocation(location));
      }
    };

    if (routerProps.globalBeforeEach) {
      router.beforeEach(routerProps.globalBeforeEach);
    }

    router.afterEach(to => {
      for (const link in links) {
        if (to.fullPath === link) {
          links[link](to.fullPath);
          replaced = true;
          return;
        }
      }
    });

    const WrappedComponent = story();
    return Vue.extend({
      router,
      components: { WrappedComponent },
      template: '<wrapped-component/>',
      beforeDestroy: function() {
        // Remove the afterEach callback from the router list to not
        // accumulate callbacks called for every route action (in practice
        // this means that without this the action is executed as many
        // times as the VueRouter instance has been created)
        this.$options.router.afterHooks = [];
      },
    });
  };
};

export default storyRouterDecorator;

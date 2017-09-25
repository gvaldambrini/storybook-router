import { configure } from '@storybook/vue';

function loadStories() {
  require('..');
}

configure(loadStories, module);

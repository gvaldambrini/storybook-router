import { configure } from '@storybook/react';

function loadStories() {
  require('..');
}

configure(loadStories, module);

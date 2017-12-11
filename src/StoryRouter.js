import ReactStoryRouter from './react';
import VueStoryRouter from './vue';

const StoryRouter = window.STORYBOOK_ENV === 'vue' ? VueStoryRouter : ReactStoryRouter;

export default StoryRouter;

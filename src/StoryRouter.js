import React from 'react';
import PropTypes from 'prop-types';

import { action } from '@kadira/storybook';
import { MemoryRouter, Route, matchPath } from 'react-router';


const StoryRouter = ({story, links, routerProps}) => (
  <MemoryRouter {...routerProps}>
    <Route render={({history}) => {
      const replaceLinks = (name, links, originalAction) => {
        return path => {
          for (const link in links) {
            if (matchPath(path, {path: link, exact: true})) {
              links[link]();
              return;
            }
          }
          originalAction(path);
          action(name)(path);
        };
      };

      history.push = replaceLinks('history.push', links, history.push);
      history.replace = replaceLinks('history.replace', links, history.replace);

      const replaceAction = (name, originalAction) => (
        arg => {
          originalAction(arg);
          action(name)(arg);
        }
      );

      history.go = replaceAction('history.go', history.go);
      history.goBack = replaceAction('history.goBack', history.goBack);
      history.goForward = replaceAction('history.goForward', history.goForward);

      return (
        <div>
          {story()}
        </div>
      );
    }} />
  </MemoryRouter>
);

StoryRouter.propTypes = {
  story: PropTypes.func.isRequired,
  links: PropTypes.object,
  routerProps: PropTypes.object
};

const storyRouterDecorator = (links, routerProps) => {
  const s = story => (
    <StoryRouter
      story={story}
      links={links}
      routerProps={routerProps} />
  );
  s.displayName = 'StoryRouter';
  return s;
};

export default storyRouterDecorator;

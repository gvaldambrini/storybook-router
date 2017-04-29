import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { action } from '@kadira/storybook';
import { MemoryRouter, Route, matchPath } from 'react-router';


class InnerComponent extends Component {
  constructor(props) {
    super(props);
    this.onHistoryChanged = this.onHistoryChanged.bind(this);
  }

  componentDidMount() {
    // React on every change to the history
    this.unlisten = this.props.history.listen(this.onHistoryChanged);
  }

  shouldComponentUpdate(nextProps) {
    // As the history object is mutable (see https://goo.gl/lusQ2H) this check prevents
    // unnecessary re-renderings.
    return nextProps.location.pathname !== this.props.location.pathname;
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onHistoryChanged(location, historyAction) {
    const path = location.pathname;
    const {links} = this.props;

    for (const link in links) {
      // If the new path matches with one of the keys defined in the links object, then
      // executes the given corresponding callback value with the path as argument.
      // As behind the scene matchProps uses path-to-regexp (https://goo.gl/xgzOaL)
      // you can use parameter names and regexp within the link keys.
      if (matchPath(path, {path: link, exact: true})) {
        links[link](path);
        return;
      }
    }
    action(historyAction)(path);
  }

  render() {
    return (
      <div>{this.props.story()}</div>
    );
  }
}

InnerComponent.propTypes = {
  story: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  links: PropTypes.object
};


const StoryRouter = ({story, links, routerProps}) => (
  // Limitation: as MemoryRouter creates a new history object, you cannot pass it from
  // a story to another one and so you cannot implement a back or forward button which
  // works among stories.
  <MemoryRouter {...routerProps}>
    <Route render={({history, location}) => (
      <InnerComponent
        story={story}
        history={history}
        location={location}
        links={links}/>
    )} />
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

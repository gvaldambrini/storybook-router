import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Route, Link, withRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

// In a project that uses 'storybook-router' from npm, use
// import StoryRouter from 'storybook-router';
import StoryRouter from '../../src/StoryRouter';


const App = ({children}) => (
  <div>
    <ul>
      <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
      <li><Link to="/form" activeClassName="active">Form</Link></li>
    </ul>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element
};

const Dashboard = () => (
  <h1>Dashboard</h1>
);

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const routerWillLeave = () => {
      if (this.state.textValue) {
        return window.confirm('Are you sure you want to leave the form?');
      }
    };

    this.props.router.setRouteLeaveHook(
      this.props.route, routerWillLeave
    );
  }

  handleChange(event) {
    this.setState({
      textValue: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form>
          <p>Put something in the input to require the confirmation before leaving the route.</p>
          <input type="text" value={this.state.textValue} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  router: PropTypes.object,
  route: PropTypes.object
};

const routes = (
  <Route path="/" component={App}>
    <Route path="dashboard" component={Dashboard} />
    <Route path="form" component={withRouter(Form)} />
  </Route>
);

storiesOf('Confirming navigation', module)
  .addDecorator(StoryRouter({}, {autoRoute: false}))
  .add('default', () => routes);

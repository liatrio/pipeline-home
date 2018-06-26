import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';

class Intro extends Component {
  render() {
    return (
      <Header as="h1" icon textAlign="center">
        <Icon name="dashboard" />
        {this.props.title}
        <Header.Subheader>Homepage</Header.Subheader>
      </Header>
    );
  }
}

export default Intro;

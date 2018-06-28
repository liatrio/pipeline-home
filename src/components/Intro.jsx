import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';

class Intro extends Component {
  render() {
    return (
      <Header as="h1" attached="top">
        <Image src={require(`../template/img/${this.props.logo_file}`)} />
        <Header.Content>
          {this.props.title}
          <Header.Subheader>{this.props.subtitle}</Header.Subheader>
        </Header.Content>
      </Header>
    );
  }
}

export default Intro;

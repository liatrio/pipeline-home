import React, { Component } from 'react';
import { Container, Label } from 'semantic-ui-react';

class FooterText extends Component {
  render() {
    return (
      <Container text textAlign="center">
        <Label size="mini">{this.props.footer}</Label>
      </Container>
    );
  }
}

export default FooterText;

import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';

class ModuleFeed extends Component {
  render() {
    return (
      <Segment attached="bottom">
        <Card.Group itemsPerRow={2}>{this.props.cards}</Card.Group>
      </Segment>
    );
  }
}

export default ModuleFeed;

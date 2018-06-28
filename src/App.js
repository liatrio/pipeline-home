import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Card, Image } from 'semantic-ui-react';
import Intro from './components/Intro';
import ModuleFeed from './components/ModuleFeed';
import FooterText from './components/FooterText';
import site from './template/site.js';
import { modules, buildLink } from './template/modules.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      site: site,
      modules: modules,
      cards: []
    };
  }

  componentDidMount() {
    let cards = [];
    Object.entries(this.state.modules).forEach(([module, details]) => {
      cards.push(
        <Card
          key={module}
          as="a"
          href={buildLink(details['key'], this.state.site)}
          target="_blank"
        >
          <Card.Content textAlign="center">
            <Card.Header>{module}</Card.Header>
          </Card.Content>
          <Card.Content textAlign="center" extra>
            <Image
              centered
              src={require(`./template/img/${details['logo']}`)}
            />
          </Card.Content>
        </Card>
      );
    });
    this.setState({ cards });
  }

  render() {
    return (
      <Container text>
        <br />
        <Intro
          title={this.state.site.title}
          subtitle={this.state.site.project_name}
          logo_file={this.state.site.logo_file}
        />
        <ModuleFeed cards={this.state.cards} />
        <FooterText footer={this.state.site.footer} />
        <br />
      </Container>
    );
  }
}

export default App;

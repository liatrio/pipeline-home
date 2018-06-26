import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class HelpBar extends Component {
  render() {
	  return (
		  <Menu attached='top'>
			  <Menu.Item name='official slack' as='a' href={this.props.slack}/>
				<Menu.Item name='support email' as='a' href={this.props.email}/>
			</Menu>
		);
	}
}

export default HelpBar;

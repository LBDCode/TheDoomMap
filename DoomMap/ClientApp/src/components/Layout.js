import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import NavMenu2 from './NavMenu2.js';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu2 />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

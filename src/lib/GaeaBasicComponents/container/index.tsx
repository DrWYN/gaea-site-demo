import * as React from 'react';
import { Props, State } from './type';

export class Container extends React.Component<Props, State> {
  static defaultProps = new Props();
  state = new State();

  render() {
    return <div style={this.props.style}>{this.props.children}</div>;
  }
}

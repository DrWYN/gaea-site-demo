import { Icon as AntIcon } from 'antd';
import * as React from 'react';
import { Props, State } from './type';

export class Icon extends React.Component<Props, State> {
  static defaultProps = new Props();
  state = new State();

  render() {
    return <AntIcon style={this.props.style} type={this.props.type} spin={this.props.spin} />;
  }
}

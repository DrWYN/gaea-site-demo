import AntButton from 'Components/Button/index';
import * as React from 'react';
import { Props, State } from './type';

export class Button extends React.Component<Props, State> {
  static defaultProps = new Props();
  state = new State();

  render() {
    return (
      <AntButton
        style={this.props.style}
        onPress={this.props.onClick}
      >
        {this.props.text}
      </AntButton>
    );
  }
}

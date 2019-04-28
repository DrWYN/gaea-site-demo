import { Switch as AntSwitch } from 'antd';
import * as React from 'react';
import { Props, State } from './type';

export class Switch extends React.Component<Props, State> {
  static defaultProps = new Props();
  state = new State();

  render() {
    return (
      <AntSwitch
        checked={this.props.checked}
        checkedChildren={this.props.checkedChildren}
        unCheckedChildren={this.props.unCheckedChildren}
        loading={this.props.loading}
        size={this.props.size}
        onChange={this.props.onChange}
      />
    );
  }
}

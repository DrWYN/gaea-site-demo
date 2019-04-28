import * as React from 'react';
import * as Styled from './tree.style';
import * as typings from './tree.type';

export class Tree extends React.Component<typings.Props, typings.State> {
  static defaultProps = new typings.Props();
  state = new typings.State();

  render() {
    const Children = React.Children.map(this.props.children, (item: any) => {
      return React.cloneElement(item, {
        defaultExpendAll: this.props.defaultExpendAll,
        toggleByArrow: this.props.toggleByArrow
      });
    });

    return <Styled.Container>{Children}</Styled.Container>;
  }
}

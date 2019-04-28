import { Connect } from 'dob-react';
import * as React from 'react';
import { Props, State } from './index.type';
import * as Styled from './style';

@Connect
class Preview extends React.Component<Props, State> {
  static defaultProps = new Props();
  state = new State();

  render() {
    return (
      <Styled.Container onClick={this.handleClick}>
        {this.props.stores.ApplicationStore.isPreview
          ? this.props.stores.ApplicationStore.setLocale('取消', 'Cancel')
          : this.props.stores.ApplicationStore.setLocale('预览', 'Preview')}
      </Styled.Container>
    );
  }

  private handleClick = () => {
    const setPreview = !this.props.stores.ApplicationStore.isPreview;
    this.props.actions.ApplicationAction.resetApplication();
    this.props.actions.ApplicationAction.setPreview(setPreview);
  };
}

export default {
  position: 'navbarRight',
  class: Preview
};

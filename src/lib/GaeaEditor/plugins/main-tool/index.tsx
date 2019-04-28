import { Tabs } from 'antd';
import { Connect } from 'dob-react';
import * as React from 'react';
import * as S from './index.style';
import { Props, State } from './index.type';

@Connect
class MainTool extends React.Component<Props, State> {
  static defaultProps = new Props();
  state = new State();

  handleChange = (activeKey: string) => {
    this.setState({
      activeKey
    });
  };

  render() {
    return (
      <S.Container>
        <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
          <Tabs.TabPane tab={this.props.stores.ApplicationStore.setLocale('编辑', 'Editor')} key="editor">
            <S.ScrollContainer>
              {this.props.actions.ApplicationAction.loadPluginByPosition('mainToolEditor')}
            </S.ScrollContainer>
          </Tabs.TabPane>
          <Tabs.TabPane tab={this.props.stores.ApplicationStore.setLocale('树状图', 'Tree')} key="tree">
            <S.ScrollContainer>
              {this.props.actions.ApplicationAction.loadPluginByPosition('mainToolTree')}
            </S.ScrollContainer>
          </Tabs.TabPane>
        </Tabs>
      </S.Container>
    );
  }
}

export default {
  position: 'mainTool',
  class: MainTool
};

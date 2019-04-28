import { observable, Static } from 'dob';
import * as React from 'react';

@observable
export default class ApplicationStore {
  /**
   * Navbar height
   */
  navbarHeight = 40;
  /**
   * Is in preview
   */
  isPreview = false;
  /**
   * Viewport parent container's style
   */
  viewportContainerStyle = {};
  /**
   * Viewport style
   */
  viewportStyle: React.CSSProperties = {};
  /**
   * All gaea plugins
   */
  plugins?: IPlugin[] = [];
  /**
   * All component's class
   * key: component's name
   * value: component's class
   */
  componentClasses = new Map<string, React.ComponentClass<IGaeaProps>>();
  /**
   * 所有组件的编辑属性 GaeaProps
   * key: gaeaKey | preGaeaKey
   */
  componentSetting = new Map<string, IGaeaSetting>();
  /**
   * 所有组件 defaultProps
   * key: gaeaKey | preGaeaKey
   */
  componentDefaultProps = new Map<string, IDefaultProps>();
  /**
   * Viewport's initialization data
   */
  defaultValue?: any = null;
  /**
   * Viewport root component's name
   */
  rootComponentName = '';
  /**
   * left tool name
   */
  leftTool: string | null = null;
  rightTool: string | null = null;
  /**
   * Show modal?
   */
  isShowModal = false;
  modalTitle = '';
  modalContentRender: (closeModal?: () => void) => React.ReactElement<any> = null;
  /**
   * 预设组件
   * 将一个组件加入此配置，这个组件会从组件列表中移除，并根据配置的 props 信息展示为 N 个独立组件
   * 在显示时，这个组件与普通组件别无二致，只是会加上默认配置，并且这个配置可以不在[可编辑配置中]
   * key: gaeaKey
   */
  preComponents = new Map<string, IPreComponent[]>();

  /**
   * GaeaEditor props: onComponentDragStart
   */
  onComponentDragStart: IOnComponentDragStart = Static(() => null as any);

  /**
   * Locale
   */
  locale?: 'zh' | 'en' = null;

  setLocale = (zh: string, en: string) => {
    switch (this.locale) {
      case 'zh':
        return zh;
      case 'en':
        return en;
      default:
        return null;
    }
  };
}

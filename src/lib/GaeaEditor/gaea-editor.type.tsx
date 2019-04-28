// import GaeaComponents from 'gaea-basic-components';
import GaeaComponents from '../GaeaBasicComponents/index';

export class Props {
  /**
   * React class you want to drag with.
   */
  componentClasses?: Array<React.ComponentClass<IGaeaProps>> = GaeaComponents;
  /**
   * Trigger when onSave button clicked.
   */
  onSave?: (value?: IFullInformation) => void;
  /**
   * Default value.
   */
  defaultValue?: IFullInformation;
  /**
   * Custom plugins include jsx and stores.
   */
  plugins?: IPlugin[] = [];
  /**
   * Locale
   */
  locale?: 'zh' | 'en' = 'zh';
  /**
   * You can rewrite viewport element.
   */
  ViewportRender?: React.ReactElement<any>;
  /**
   * Disable built-in plugin list
   */
  disableBuiltInPlugin: string[] = [];
  /**
   * 预设组件
   * gaeaKey 必须从已有组件中读取
   */
  preComponents?: Array<{
    gaeaKey: string;
    components: IPreComponent[];
  }> = [];
  /**
   * 组件被拖拽起来时的回调，你可以填充 props 为即将渲染的组件。
   * 也可以发请求获取数据再填充到 props，只要返回一个 promise，编辑器会等到返回数据再执行组件渲染
   */
  onComponentDragStart?: IOnComponentDragStart;
}

export class State {}

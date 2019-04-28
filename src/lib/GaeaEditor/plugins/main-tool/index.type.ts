import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {}
export class State {
  /**
   * 当前 tab 选择
   */
  activeKey?: string = 'editor';
}

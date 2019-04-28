import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {
  /**
   * injected 完整的控制字段路径
   */
  realField?: string = '';
  editors?: IEditor[];
}
export class State {
  /**
   * 记录 array object 等类型数据展开状态
   * 属性 key 形成规则 `${type}_${field}`
   */
  expandStates: Map<string, boolean> = new Map<string, boolean>();
}

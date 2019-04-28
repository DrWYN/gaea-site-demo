import { observable } from 'dob';

/**
 * 存储所有编辑状态视图区域的数据
 */
@observable
export default class ViewportStore {
  /**
   * 视图区域 dom
   */
  viewportDOM: HTMLElement = null;
  /**
   * 根级实例的 key
   */
  rootInstanceKey: string = null;
  /**
   * 当前所有组件实例
   */
  instances = new Map<string, InstanceInfo>();
  /**
   * 组件实例到dom节点的映射
   */
  instanceDoms = new Map<string, HTMLElement>();
  /**
   * current drag info
   */
  currentDragInfo: IDragInfo = null;

  currentHoverInstanceKey: string = null;

  currentEditInstanceKey: string;

  get currentFullInformation() {
    const fullObj: IFullInformation = {};
    this.instances.forEach((instanceInfo, instanceKey) => {
      fullObj[instanceKey] = instanceInfo;
    });
    return fullObj;
  }

  /**
   * 拖拽前数据获取是否完毕
   */
  dragStartDataReady = false;
}

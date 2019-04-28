import { inject } from 'dob';
import ViewportStore from '../../stores/viewport/store';

export default class TreeStore {
  @inject(ViewportStore) viewportStore: ViewportStore;

  // 树根节点实例
  treeRootDom: HTMLElement;

  // 所有树节点实例
  treeDoms = new Map<string, HTMLElement>();

  // 当前 hover 的树 dom 节点
  get currentHoverTreeDom() {
    return this.treeDoms.get(this.viewportStore.currentHoverInstanceKey);
  }
}

import { Action, inject } from 'dob';
import TreeStore from './store';

export default class TreeAction {
  @inject(TreeStore) private store: TreeStore;

  /**
   * 设置树根节点
   */
  @Action
  setTreeRootDom(dom: HTMLElement) {
    this.store.treeRootDom = dom;
  }

  /**
   * 新增树 dom
   */
  @Action
  addTreeDom(instanceKey: string, dom: HTMLElement) {
    this.store.treeDoms.set(instanceKey, dom);
  }
  /**
   * 移除树 dom
   */
  @Action
  removeTreeDom(instanceKey: string) {
    this.store.treeDoms.delete(instanceKey);
  }
}

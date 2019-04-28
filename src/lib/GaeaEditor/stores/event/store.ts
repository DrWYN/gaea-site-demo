/**
 * 存储所有事件
 */
export default class ViewportStore {
  /**
   * 鼠标离开视图区域
   */
  mouseLeaveViewport = 'mouseLeaveViewport';

  /**
   * 鼠标移动到某个组件上
   */
  mouseHoveringComponent = 'mouseHoveringComponent';

  /**
   * 视图区域发生更新
   */
  viewportUpdated = 'viewportUpdated';

  /**
   * 刷新某个实例
   */
  instanceUpdate = 'instanceUpdate';

  /**
   * 页面重渲染
   */
  refreshPage = 'refreshPage';

  /**
   * 触发编辑器回调
   */
  emitEditorCallback = 'emitEditorCallback';
}

import * as React from 'react';
import View from '../View/index';
import styles from './index.module.scss';

interface ISwipeRowProps {
  testID?: string;
  className?: string;
  style?: any;
  left?: any; // 左button
  leftOpenValue?: number; // 左button宽度
  disableLeftSwipe?: boolean; // 是否禁用左button，默认不禁用
  body?: any; // content
  right?: any; // 右button
  disableRightSwipe?: boolean; // 是否禁用右button，默认不禁用
  rightOpenValue?: number; // 右button宽度
  maxSlideLength?: number; // 滑动阀值，默认为20
  onRowDidClose?: any; // row关闭后的回调事件
  onRowDidOpen?: any; // row打开后的回调事件
  uuid?: number | string;// UUID
}

interface ISwipeRowState {
  btnOpenState: string // 两边按钮的打开状态: left、right、none
};

function closest(el:any, selector:any) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }
  return null;
}

class SwipeRow extends React.Component<ISwipeRowProps, ISwipeRowState> {

  static defaultProps = {
    testID: '',
    className: '',
    style: {},
    leftOpenValue: 0,
    disableLeftSwipe: false,
    disableRightSwipe: false,
    rightOpenValue: 0,
    slidemaxlength: 20,
  };

  body: any;
  screenX: number;
  screenY: number;
  moveStatus: string;
  canMove: boolean;

  constructor(props: ISwipeRowProps) {
    super(props);
    this.state = { btnOpenState: 'none' };
  }

  componentDidMount() {
    this.attachTouch();
  }

  componentWillUnmount() {
    this.detachTouch();
  }

  attachTouch = () => {
    this.body && this.body.addEventListener('touchstart', this.handleTouchStart, false);
    this.body && this.body.addEventListener('touchmove', this.handleTouchMove, false);
  }

  detachTouch() {
    this.body && this.body.removeEventListener('touchstart', this.handleTouchStart, false);
    this.body && this.body.removeEventListener('touchmove', this.handleTouchMove, false);
  }

  handleTouchStart = (e: any = {}, touch: any = {}) => {
    const { touches = {} } = e;
    const { screenX = 0, screenY = 0 } = touches[0];
    this.screenX = screenX;
    this.screenY = screenY;
    this.moveStatus='start';
  }

  closeSwiper=(e: any = {}, touch: any = {})=>{
    const { btnOpenState } =this.state;
    const pNode = closest(e.target, `.swiperow${this.props.uuid}`);
    if (!pNode && btnOpenState!=='none') {
      this.close(touch);
    }
  }

  close(touch: any = {}){
    this.setState({ btnOpenState: 'none' })
  }

  handleTouchEnd = (e: any = {}, touch: any = {}) => {
    this.moveStatus='end';
    this.canMove=false;
  }
  
  handleTouchMove = (e: any = {}, touch: any = {}) => {
    const { maxSlideLength = 20, onRowDidClose, onRowDidOpen, disableLeftSwipe, disableRightSwipe } = this.props;
    const { btnOpenState } = this.state;
    let newBtnOpenState = btnOpenState;

    const { touches = {} } = e;

    const { screenX = 0, screenY = 0 } = touches[0];
    const dx = screenX - this.screenX;
    const dy = screenY - this.screenY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    if(this.moveStatus==='start'){
      if((angle > -135 && angle < -45) || (angle > 45 && angle < 135)){
        this.canMove=false;
      }else {
        this.canMove=true;
      }
      this.moveStatus='move'
    }
    
    if(!this.canMove){
      console.log('cant move');
      return
    }else {
      if(e.preventDefault){
        e.preventDefault();
      }
    }

    e.stopPropagation();

    // 未达到滑动阀值
    if (Math.abs(dx) < maxSlideLength) {
      return;
    }

    // 手指向右滑动
    if (angle > -45 && angle < 45) {
      if (btnOpenState === 'right') {
        newBtnOpenState = 'none';
        document.body.removeEventListener('touchstart', this.closeSwiper, true);
      }
      if (btnOpenState === 'none' && !disableLeftSwipe) {
        newBtnOpenState = 'left';
        document.body.addEventListener('touchstart', this.closeSwiper, true);
      }
    }

    // 手指向左滑动
    if (angle > 135 || angle < -135) {
      if (btnOpenState === 'left') {
        newBtnOpenState = 'none';
        document.body.removeEventListener('touchstart', this.closeSwiper, true);
      }
      if (btnOpenState === 'none' && !disableRightSwipe) {
        newBtnOpenState = 'right';
        document.body.addEventListener('touchstart', this.closeSwiper, true);
      }
    }

    if (newBtnOpenState !== btnOpenState) {
      this.setState({ btnOpenState: newBtnOpenState }, () => { this.screenX = screenX; });
    }
    
    if (typeof onRowDidClose === 'function' && newBtnOpenState === 'none' && btnOpenState !== 'none') {
      onRowDidClose(btnOpenState);
    }

    if (typeof onRowDidOpen === 'function' && newBtnOpenState !== 'none' && btnOpenState === 'none') {
      onRowDidOpen(newBtnOpenState);
    }
  }

  render() {
    const { testID, className, style, left, body, right, leftOpenValue = 0, rightOpenValue = 0, uuid } = this.props;
    const { btnOpenState } = this.state;
    
    return (
      <View style={style} className={`${btnOpenState==='none'?'':'swiperow'+uuid}`}>
        <View
          style={{
            overflow: 'visible',
            left: btnOpenState === 'left' ? leftOpenValue : (btnOpenState === 'right' ? -rightOpenValue : 0)
          }}
          className={`${styles.SwipeRow} ${className}`}
          data-testid={testID}
        >
          <View style={{ width: leftOpenValue, left: -leftOpenValue }} >{left}</View>
          <div ref={_ref => (this.body = _ref)}>{body}</div>
          <View style={{ width: rightOpenValue, right: -rightOpenValue }} >{right}</View>
        </View>
      </View>
    );
  }
}

export default SwipeRow;

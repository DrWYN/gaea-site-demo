import React from 'react';
import ReactDOM from 'react-dom';
// import debounce from 'debounce';

// import View from 'Components/View';

import moduleStyle from './scrollView.module.scss';

interface IProps {
  scrollEventThrottle?: number;
  horizontal?: boolean;
  scrollEnabled?: boolean;
  onScroll?: (e: any) => void;
  onScrollEnd?: (e: any) => void;
  children: React.ReactNode;
  className?: string;
  style?: object;
  contentContainerStyle?: object;
  isTop?: (i: boolean,direction:string) => void;
  withFlexClass?: boolean;
}

// interface IStates {

// }

class ScrollView extends React.Component<IProps, any> {
  static displayName = 'ScrollView';

  _scrollView: HTMLDivElement | null = null;

  _innerViewRef: HTMLDivElement | null = null;
  
  _state = { isScrolling: false, scrollLastTick: 0 };

  _direction:string='none';

  _scrollStart:number=0;

  // _debouncedOnScrollEnd = debounce(this._handleScrollEnd, 100);

  constructor(props: any) {
    super(props);
  }

  getInnerViewNode = () => {
    return this.props.children;
  };

  getScrollableNode = () => {
    return this._scrollView;
  };

  scrollTop = () => {
    if (this._scrollView) {
      this._scrollView.scrollTop = 0;
    }
  }

  scrollTo = ({x = 0, y = 0, animated = true, ...options}: {x?: number, y?: number, animated?: boolean, options?: object}) => {
    if (this._scrollView) {
      // const type = animated ? 'smooth' : 'instant';
      this._scrollView.scrollTop=y;
      this._scrollView.scrollLeft=x;
    }
  };

  scrollToEnd = ({animated = true, ...options}: {animated?: boolean, options?: object}) => {
    if (this._scrollView) {
      const { scrollHeight, scrollWidth } = this._scrollView;
      // const type = animated ? 'smooth' : 'instant';
      this._scrollView.scrollTo({ top: scrollHeight, left: scrollWidth });
    }
  };

  _handleTouchStart = (e: any) => {
    // console.log('--->>>>_handleScrollStart = ', e, e.target);
    // this._state.isScrolling = true;
    // this._state.scrollLastTick = Date.now();
    this._direction='none';
    this._scrollStart=e.touches[0].pageY;
  }

  _handleTouchMove = (e: any) => {
    // console.log('--->>>>_handleScrollStart = ', e, e.target);
    // this._state.isScrolling = true;
    // this._state.scrollLastTick = Date.now();
    if(e.touches[0].pageY === this._scrollStart){
        return
    }
    e.touches[0].pageY > this._scrollStart ? this._direction='down' : this._direction='up';
    this._scrollStart=e.touches[0].pageY;
    const { isTop } = this.props;
    this._scrollView && isTop && isTop(this._scrollView.scrollTop === 0,this._direction);
  }

  onScroll = (e: any) => {
    const { onScroll, isTop } = this.props;
    onScroll && onScroll(e);
    this._scrollView && isTop && isTop(this._scrollView.scrollTop === 0,this._direction);
  }

  render() {
    const { children, className = '', style = {}, contentContainerStyle = {}, horizontal = false, scrollEnabled = true, isTop, withFlexClass = true, onScroll, ...others } = this.props;
    let _style = {};
    if (scrollEnabled) {
      if (horizontal) {
        _style = { overflowX: 'auto', overflowY: 'hidden' };
      } else {
        _style = { overflowX: 'hidden', overflowY: 'auto' };
      }
    } else {
      _style = {};
    }
    return (
      <div
        className={`flex scrollView ${horizontal ? '' : 'flex-1 flex-column'} ${moduleStyle.scrollView} ${className}`}
        ref={_ref => this._scrollView = _ref && ReactDOM.findDOMNode(_ref) as HTMLDivElement }
        style={Object.assign(_style, style)}
        onScroll={this.onScroll}
        onTouchStart={this._handleTouchStart}
        onTouchMove={this._handleTouchMove}
        {...others}
      >
        <div 
          className={ withFlexClass ? `flex ${horizontal ? '' : 'flex-column'} flex-no-shrink` : ''}
          ref={_ref => this._innerViewRef = _ref && ReactDOM.findDOMNode(_ref) as HTMLDivElement}
          style={Object.assign({ flexBasis: 'auto' }, contentContainerStyle)}>
          {children}
        </div>
       {/* React.Children.map(children, (child, index) => {
         if (React.isValidElement<React.HTMLAttributes<any>>(child)) {
          return React.cloneElement(child, {key: index, className: `flex-no-shrink ${child.props.className || ''}`});
         }
         else {
           return child;
         }
       }) */}
      </div>
    );
  }

  // _shouldEmitScrollEvent(lastTick: number, eventThrottle: number) {
  //   const timeSinceLastTick = Date.now() - lastTick;
  //   return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
  // }

  // _handleScroll = (e: any) => {
  //   e.persist()
  //   e.stopPropagation(); 
  //   const { scrollEventThrottle = 50 } = this.props;
  //   // A scroll happened, so the scroll bumps the debounce.
  //   this._debouncedOnScrollEnd(e);
  //   if(this._state.isScrolling) {
  //     // Scroll last tick may have changed, check if we need to notify
  //     if(this._shouldEmitScrollEvent(this._state.scrollLastTick, scrollEventThrottle)){
  //       this._handleScrollTick(e);
  //     }
  //   } else {
  //     // Weren't scrolling, so we must have just started
  //     this._handleScrollStart(e);
  //   }
  // }

  // _handleScrollTick(e: any) {
  //   // console.log('--->>>>_handleScrollTick = ', e, e.target);
  //   const { onScroll } = this.props;
  //   this._state.scrollLastTick = Date.now();
  //   if(onScroll) {
  //     onScroll(e);
  //   }
  // }

  // _handleScrollEnd(e: any) {
  //   // console.log('--->>>>_handleScrollEnd = ', e, e.target);
  //   const { onScrollEnd } = this.props;
  //   this._state.isScrolling = false;
  //   if(onScrollEnd) {
  //     onScrollEnd(e);
  //   }
  // }
}

export default ScrollView;

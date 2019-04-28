// inspired by react-native

import { Component } from 'react';
// import Utils from 'Utils/index';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PressEvent, { shouldFirePress } from './PressEvent';
import {
    copy,
    extractSingleTouch,
    States,
    Signals,
    Transitions,
    IsActive,
    IsPressingIn,
    IsLongPressingIn,
    ITouchable,
    HIGHLIGHT_DELAY_MS,
    PRESS_EXPAND_PX,
    LONG_PRESS_DELAY_MS,
    LONG_PRESS_ALLOWED_MOVEMENT,
    isAllowPress
} from './wagas';

// Default amount "active" region protrudes beyond box

export default class Touchable extends Component<ITouchable, any> {
    static defaultProps = {
        fixClickPenetration: false,
        disabled: false,
        delayPressIn: HIGHLIGHT_DELAY_MS,
        delayLongPress: LONG_PRESS_DELAY_MS,
        delayPressOut: 100,
        pressRetentionOffset: {
            left: PRESS_EXPAND_PX,
            right: PRESS_EXPAND_PX,
            top: PRESS_EXPAND_PX,
            bottom: PRESS_EXPAND_PX
        },
        longPressCancelsPress: true
    };

    lastClickTime = 0;
    state = {
        active: false
    };

    touchable: any;
    root: any;
    releaseLockTimer: any;
    touchableDelayTimeout: any;
    longPressDelayTimeout: any;
    pressOutDelayTimeout: any;
    lockMouse: any;
    pressInLocation: { pageX: number; pageY: number };

    _onTouchMove = this.props.onTouchMove;
    componentWillMount() {
        this.touchable = { touchState: undefined };
    }

    componentDidMount() {
        this.root = ReactDOM.findDOMNode(this);
    }

    componentDidUpdate() {
        this.root = ReactDOM.findDOMNode(this);
        // disabled auto clear active state
        if (this.props.disabled && this.state.active) {
            this.setState({
                active: false
            });
        }
    }

    componentWillUnmount() {
        if (this.releaseLockTimer) {
            clearTimeout(this.releaseLockTimer);
        }
        if (this.touchableDelayTimeout) {
            clearTimeout(this.touchableDelayTimeout);
        }
        if (this.longPressDelayTimeout) {
            clearTimeout(this.longPressDelayTimeout);
        }
        if (this.pressOutDelayTimeout) {
            clearTimeout(this.pressOutDelayTimeout);
        }
    }

    callChildEvent(event: any, e: any) {
      // @ts-ignore
        const childHandle = React.Children.only(this.props.children).props[
            event
        ];
        if (childHandle) {
            childHandle(e);
        }
    }

    onTouchStart = (e: any) => {
        this.callChildEvent('onTouchStart', e);
        this.lockMouse = true;
        if (this.releaseLockTimer) {
            clearTimeout(this.releaseLockTimer);
        }
        this.touchableHandleResponderGrant(e.nativeEvent);
    };

    onTouchMove = (e: any) => {
        this.callChildEvent('onTouchMove', e);
        this.touchableHandleResponderMove(e.nativeEvent);
    };

    onTouchEnd = (e: any) => {
        this.callChildEvent('onTouchEnd', e);
        this.releaseLockTimer = setTimeout(() => {
            this.lockMouse = false;
        }, 300);
        this.touchableHandleResponderRelease(new PressEvent(e.nativeEvent));
    };

    onTouchCancel = (e: any) => {
        this.callChildEvent('onTouchCancel', e);
        this.releaseLockTimer = setTimeout(() => {
            this.lockMouse = false;
        }, 300);
        this.touchableHandleResponderTerminate(e.nativeEvent);
    };

    onMouseDown = (e: any) => {
        this.callChildEvent('onMouseDown', e);
        if (this.lockMouse) {
            return;
        }
        this.touchableHandleResponderGrant(e.nativeEvent);
        document.addEventListener(
            'mousemove',
            this.touchableHandleResponderMove,
            false
        );
        document.addEventListener('mouseup', this.onMouseUp, false);
    };

    onMouseUp = (e: any) => {
        document.removeEventListener(
            'mousemove',
            this.touchableHandleResponderMove,
            false
        );
        document.removeEventListener('mouseup', this.onMouseUp, false);
        this.touchableHandleResponderRelease(new PressEvent(e));
    };

    _remeasureMetricsOnInit(e: any) {
        const { root } = this;
        const touch = extractSingleTouch(e);
        const boundingRect = root.getBoundingClientRect();
        this.touchable = {
            touchState: this.touchable.touchState,
            startMouse: {
                pageX: touch.pageX,
                pageY: touch.pageY
            },
            positionOnGrant: {
                left: boundingRect.left + window.pageXOffset,
                top: boundingRect.top + window.pageYOffset,
                width: boundingRect.width,
                height: boundingRect.height,
                clientLeft: boundingRect.left,
                clientTop: boundingRect.top
            }
        };
    }

    touchableHandleResponderGrant(e: any) {
        const touch = extractSingleTouch(e);
        if (this.props.gestureResponder) {
            this.props.gestureResponder.onResponderGrant &&
                this.props.gestureResponder.onResponderGrant(e, touch);
        }
        this.touchable.touchState = States.NOT_RESPONDER;

        if (this.pressOutDelayTimeout) {
            clearTimeout(this.pressOutDelayTimeout);
            this.pressOutDelayTimeout = null;
        }

        if (
            this.props.fixClickPenetration &&
            !isAllowPress(this.lastClickTime)
        ) {
            return;
        }

        this._remeasureMetricsOnInit(e);

        this._receiveSignal(Signals.RESPONDER_GRANT, e);
        const {
            delayPressIn: delayMS,
            delayLongPress: longDelayMS
        } = this.props;
        if (delayMS) {
            this.touchableDelayTimeout = setTimeout(() => {
                this._handleDelay(e);
            }, delayMS);
        } else {
            this._handleDelay(e);
        }

        const longPressEvent = new PressEvent(e);
        this.longPressDelayTimeout = setTimeout(() => {
            this._handleLongDelay(longPressEvent);
        }, longDelayMS! + delayMS!);
    }

    checkScroll(e: any) {
        const positionOnGrant = this.touchable.positionOnGrant;
        // container or window scroll
        const boundingRect = this.root.getBoundingClientRect();
        if (
            boundingRect.left !== positionOnGrant.clientLeft ||
            boundingRect.top !== positionOnGrant.clientTop
        ) {
            this._receiveSignal(Signals.RESPONDER_TERMINATED, e);
            return false;
        }
        return true;
    }

    touchableHandleResponderRelease(e: any) {
        if (!this.touchable.startMouse) {
            return;
        }
        const touch = extractSingleTouch(e);
        if (this.props.gestureResponder) {
            this.props.gestureResponder.onResponderRelease &&
                this.props.gestureResponder.onResponderRelease(e, touch);
        }
        if (
            Math.abs(touch.pageX - this.touchable.startMouse.pageX) > 30 ||
            Math.abs(touch.pageY - this.touchable.startMouse.pageY) > 30
        ) {
            this._receiveSignal(Signals.RESPONDER_TERMINATED, e);
            return;
        }
        if (this.checkScroll(e) === false) {
            return;
        }
        this._receiveSignal(Signals.RESPONDER_RELEASE, e);
    }

    touchableHandleResponderTerminate(e: any) {
        if (!this.touchable.startMouse) {
            return;
        }
        if (this.props.gestureResponder) {
            const touch = extractSingleTouch(e);
            this.props.gestureResponder.onResponderTerminate &&
                this.props.gestureResponder.onResponderTerminate(e, touch);
        }
        this._receiveSignal(Signals.RESPONDER_TERMINATED, e);
    }

    checkTouchWithinActive(e: any) {
        const { positionOnGrant } = this.touchable;
        const { pressRetentionOffset = {} as any, hitSlop } = this.props;

        let pressExpandLeft = pressRetentionOffset.left;
        let pressExpandTop = pressRetentionOffset.top;
        let pressExpandRight = pressRetentionOffset.right;
        let pressExpandBottom = pressRetentionOffset.bottom;

        if (hitSlop) {
            pressExpandLeft += hitSlop.left;
            pressExpandTop += hitSlop.top;
            pressExpandRight += hitSlop.right;
            pressExpandBottom += hitSlop.bottom;
        }

        const touch = extractSingleTouch(e);
        const pageX = touch && touch.pageX;
        const pageY = touch && touch.pageY;
        return (
            pageX > positionOnGrant.left - pressExpandLeft &&
            pageY > positionOnGrant.top - pressExpandTop &&
            pageX <
                positionOnGrant.left +
                    positionOnGrant.width +
                    pressExpandRight &&
            pageY <
                positionOnGrant.top + positionOnGrant.height + pressExpandBottom
        );
    }

    touchableHandleResponderMove = (e: any) => {
        if (!this._onTouchMove) {
            this._onTouchMove = () => null;
        }

        if (!this.touchable.startMouse) {
            return;
        }
        // Measurement may not have returned yet.
        if (
            !this.touchable.dimensionsOnActivate ||
            this.touchable.touchState === States.NOT_RESPONDER
        ) {
            return;
        }

        // Not enough time elapsed yet, wait for highlight -
        // this is just a perf optimization.
        if (this.touchable.touchState === States.RESPONDER_INACTIVE_PRESS_IN) {
            return;
        }

        const touch = extractSingleTouch(e);

        const pageX = touch && touch.pageX;
        const pageY = touch && touch.pageY;
        this._onTouchMove(e, touch);
        if (this.props.gestureResponder) {
            this.props.gestureResponder.onResponderMove &&
                this.props.gestureResponder.onResponderMove(e, touch);
        }
        if (this.pressInLocation) {
            const movedDistance = this._getDistanceBetweenPoints(
                pageX,
                pageY,
                this.pressInLocation.pageX,
                this.pressInLocation.pageY
            );
            if (movedDistance > LONG_PRESS_ALLOWED_MOVEMENT) {
                this._cancelLongPressDelayTimeout();
            }
        }
        if (this.checkTouchWithinActive(e)) {
            this._receiveSignal(Signals.ENTER_PRESS_RECT, e);
            const curState = this.touchable.touchState;
            if (curState === States.RESPONDER_INACTIVE_PRESS_IN) {
                this._cancelLongPressDelayTimeout();
            }
        } else {
            this._cancelLongPressDelayTimeout();
            this._receiveSignal(Signals.LEAVE_PRESS_RECT, e);
        }
    };

    callProp(name: string, e: any) {
        if (this.props[name] && !this.props.disabled) {
            this.props[name](e);
            e.preventDefault();
        }
    }

    touchableHandleActivePressIn(e: any) {
        this.setActive(true);
        this.callProp('onPressIn', e);
    }

    touchableHandleActivePressOut(e: any) {
        this.setActive(false);
        this.callProp('onPressOut', e);
    }

    touchableHandlePress(e: any) {
        if (shouldFirePress(e)) {
            this.callProp('onPress', e);
        }
        this.lastClickTime = Date.now();
    }

    touchableHandleLongPress(e: any) {
        if (!this.props.hasNoLongPress && shouldFirePress(e)) {
            this.callProp('onLongPress', e);
        }
    }

    setActive(active: boolean) {
        if (this.props.activeClassName || this.props.activeStyle) {
            this.setState({
                active
            });
        }
    }

    _remeasureMetricsOnActivation() {
        this.touchable.dimensionsOnActivate = this.touchable.positionOnGrant;
    }

    _handleDelay(e: any) {
        this.touchableDelayTimeout = null;
        this._receiveSignal(Signals.DELAY, e);
    }

    _handleLongDelay(e: any) {
        this.longPressDelayTimeout = null;
        const curState = this.touchable.touchState;
        if (
            curState !== States.RESPONDER_ACTIVE_PRESS_IN &&
            curState !== States.RESPONDER_ACTIVE_LONG_PRESS_IN
        ) {
            console.error(
                'Attempted to transition from state `' +
                    curState +
                    '` to `' +
                    States.RESPONDER_ACTIVE_LONG_PRESS_IN +
                    '`, which is not supported. This is ' +
                    'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.'
            );
        } else {
            this._receiveSignal(Signals.LONG_PRESS_DETECTED, e);
        }
    }

    _receiveSignal(signal: any, e: any) {
        const curState = this.touchable.touchState;
        const nextState =
            Transitions[curState] && Transitions[curState][signal];
        if (!nextState) {
            return;
        }
        if (nextState === States.ERROR) {
            return;
        }
        if (curState !== nextState) {
            this._performSideEffectsForTransition(
                curState,
                nextState,
                signal,
                e
            );
            this.touchable.touchState = nextState;
        }
    }

    _cancelLongPressDelayTimeout() {
        if (this.longPressDelayTimeout) {
            clearTimeout(this.longPressDelayTimeout);
            this.longPressDelayTimeout = null;
        }
    }

    _isHighlight(state: any) {
        return (
            state === States.RESPONDER_ACTIVE_PRESS_IN ||
            state === States.RESPONDER_ACTIVE_LONG_PRESS_IN
        );
    }

    _savePressInLocation(e: any) {
        const touch = extractSingleTouch(e);
        const pageX = touch && touch.pageX;
        const pageY = touch && touch.pageY;
        this.pressInLocation = { pageX, pageY };
    }

    _getDistanceBetweenPoints(aX: number, aY: number, bX: number, bY: number) {
        const deltaX = aX - bX;
        const deltaY = aY - bY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    _performSideEffectsForTransition(
        curState: any,
        nextState: any,
        signal: any,
        e: any
    ) {
        const curIsHighlight = this._isHighlight(curState);
        const newIsHighlight = this._isHighlight(nextState);

        const isFinalSignal =
            signal === Signals.RESPONDER_TERMINATED ||
            signal === Signals.RESPONDER_RELEASE;

        if (isFinalSignal) {
            this._cancelLongPressDelayTimeout();
        }

        if (!IsActive[curState] && IsActive[nextState]) {
            this._remeasureMetricsOnActivation();
        }

        if (IsPressingIn[curState] && signal === Signals.LONG_PRESS_DETECTED) {
            this.touchableHandleLongPress(e);
        }

        if (newIsHighlight && !curIsHighlight) {
            this._startHighlight(e);
        } else if (!newIsHighlight && curIsHighlight) {
            this._endHighlight(e);
        }

        if (IsPressingIn[curState] && signal === Signals.RESPONDER_RELEASE) {
            const hasLongPressHandler = !!this.props.onLongPress;
            const pressIsLongButStillCallOnPress =
                IsLongPressingIn[curState] && // We *are* long pressing..
                (!hasLongPressHandler || // But either has no long handler
                    !this.props.longPressCancelsPress); // or we're told to ignore it.

            const shouldInvokePress =
                !IsLongPressingIn[curState] || pressIsLongButStillCallOnPress;
            if (shouldInvokePress) {
                if (!newIsHighlight && !curIsHighlight) {
                    // we never highlighted because of delay, but we should highlight now
                    this._startHighlight(e);
                    this._endHighlight(e);
                }
                this.touchableHandlePress(e);
            }
        }

        if (this.touchableDelayTimeout) {
            clearTimeout(this.touchableDelayTimeout);
            this.touchableDelayTimeout = null;
        }
    }

    _startHighlight(e: any) {
        this._savePressInLocation(e);
        this.touchableHandleActivePressIn(e);
    }

    _endHighlight(e: any) {
        if (this.props.delayPressOut) {
            this.pressOutDelayTimeout = setTimeout(() => {
                this.touchableHandleActivePressOut(e);
            }, this.props.delayPressOut);
        } else {
            this.touchableHandleActivePressOut(e);
        }
    }

    render() {
        const {
            children,
            disabled,
            inactiveStyle,
            activeStyle,
            inactiveClassName,
            activeClassName
        } = this.props;
        const events = disabled
            ? undefined
            : copy(this, [
                  'onTouchStart',
                  'onTouchMove',
                  'onTouchEnd',
                  'onTouchCancel',
                  'onMouseDown'
              ]);
        const child = React.Children.only(children);

        if (!disabled) {
            // @ts-ignore
            let { style, className } = child.props;
            const currentStyle = this.state.active
                ? activeStyle
                : inactiveStyle;
            const currentClassName = this.state.active
                ? activeClassName
                : inactiveClassName;

            if (currentStyle) {
                style = {
                    ...style,
                    ...currentStyle
                };
            }
            if (currentClassName) {
                if (className) {
                    className += ` ${currentClassName}`;
                } else {
                    className = currentClassName;
                }
            }
            // @ts-ignore
            return React.cloneElement(child, {
                className,
                style,
                ...events
            });
        }
        // @ts-ignore
        return React.cloneElement(child, events);
    }
}

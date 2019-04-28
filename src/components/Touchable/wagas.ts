export const copy = (from: object, list: string[]) => {
    const to = {};
    list.forEach(k => {
        to[k] = from[k];
    });
    return to;
};

export function extractSingleTouch(nEvent: any) {
    let nativeEvent = nEvent;
    if (nativeEvent.nativeEvent) {
        nativeEvent = nativeEvent.nativeEvent;
    }
    const touches = nativeEvent.touches;
    const changedTouches = nativeEvent.changedTouches;
    const hasTouches = touches && touches.length > 0;
    const hasChangedTouches = changedTouches && changedTouches.length > 0;

    // return !hasTouches && hasChangedTouches
    //     ? changedTouches[0]
    //     : hasTouches ? touches[0] : nativeEvent;

    if (!hasTouches && hasChangedTouches) {
        return changedTouches[0];
    } else {
        if (hasTouches) {
            return touches[0];
        } else {
            return nativeEvent;
        }
    }
}

//

export const States = {
    NOT_RESPONDER: 'NOT_RESPONDER', // Not the responder
    RESPONDER_INACTIVE_PRESS_IN: 'RESPONDER_INACTIVE_PRESS_IN', // Responder, inactive, in the `PressRect`
    RESPONDER_INACTIVE_PRESS_OUT: 'RESPONDER_INACTIVE_PRESS_OUT', // Responder, inactive, out of `PressRect`
    RESPONDER_ACTIVE_PRESS_IN: 'RESPONDER_ACTIVE_PRESS_IN', // Responder, active, in the `PressRect`
    RESPONDER_ACTIVE_PRESS_OUT: 'RESPONDER_ACTIVE_PRESS_OUT', // Responder, active, out of `PressRect`
    RESPONDER_ACTIVE_LONG_PRESS_IN: 'RESPONDER_ACTIVE_LONG_PRESS_IN', // Responder, active, in the `PressRect`, after long press threshold
    RESPONDER_ACTIVE_LONG_PRESS_OUT: 'RESPONDER_ACTIVE_LONG_PRESS_OUT', // Responder, active, out of `PressRect`, after long press threshold
    ERROR: 'ERROR'
};

/**
 * Quick lookup map for states that are considered to be "active"
 */
export const IsActive = {
    RESPONDER_ACTIVE_PRESS_OUT: true,
    RESPONDER_ACTIVE_PRESS_IN: true
};

/**
 * Quick lookup for states that are considered to be "pressing" and are
 * therefore eligible to result in a "selection" if the press stops.
 */
export const IsPressingIn = {
    RESPONDER_INACTIVE_PRESS_IN: true,
    RESPONDER_ACTIVE_PRESS_IN: true,
    RESPONDER_ACTIVE_LONG_PRESS_IN: true
};

export const IsLongPressingIn = {
    RESPONDER_ACTIVE_LONG_PRESS_IN: true
};

/**
 * Inputs to the state machine.
 */
export const Signals = {
    DELAY: 'DELAY',
    RESPONDER_GRANT: 'RESPONDER_GRANT',
    RESPONDER_RELEASE: 'RESPONDER_RELEASE',
    RESPONDER_TERMINATED: 'RESPONDER_TERMINATED',
    ENTER_PRESS_RECT: 'ENTER_PRESS_RECT',
    LEAVE_PRESS_RECT: 'LEAVE_PRESS_RECT',
    LONG_PRESS_DETECTED: 'LONG_PRESS_DETECTED'
};

/**
 * Mapping from States x Signals => States
 */
export const Transitions = {
    NOT_RESPONDER: {
        DELAY: States.ERROR,
        RESPONDER_GRANT: States.RESPONDER_INACTIVE_PRESS_IN,
        RESPONDER_RELEASE: States.ERROR,
        RESPONDER_TERMINATED: States.ERROR,
        ENTER_PRESS_RECT: States.ERROR,
        LEAVE_PRESS_RECT: States.ERROR,
        LONG_PRESS_DETECTED: States.ERROR
    },

    RESPONDER_INACTIVE_PRESS_IN: {
        DELAY: States.RESPONDER_ACTIVE_PRESS_IN,
        RESPONDER_GRANT: States.ERROR,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_IN,
        LEAVE_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_OUT,
        LONG_PRESS_DETECTED: States.ERROR
    },
    RESPONDER_INACTIVE_PRESS_OUT: {
        DELAY: States.RESPONDER_ACTIVE_PRESS_OUT,
        RESPONDER_GRANT: States.ERROR,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_IN,
        LEAVE_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_OUT,
        LONG_PRESS_DETECTED: States.ERROR
    },
    RESPONDER_ACTIVE_PRESS_IN: {
        DELAY: States.ERROR,
        RESPONDER_GRANT: States.ERROR,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_IN,
        LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_OUT,
        LONG_PRESS_DETECTED: States.RESPONDER_ACTIVE_LONG_PRESS_IN
    },
    RESPONDER_ACTIVE_PRESS_OUT: {
        DELAY: States.ERROR,
        RESPONDER_GRANT: States.ERROR,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_IN,
        LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_OUT,
        LONG_PRESS_DETECTED: States.ERROR
    },
    RESPONDER_ACTIVE_LONG_PRESS_IN: {
        DELAY: States.ERROR,
        RESPONDER_GRANT: States.ERROR,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
        LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
        LONG_PRESS_DETECTED: States.RESPONDER_ACTIVE_LONG_PRESS_IN
    },
    RESPONDER_ACTIVE_LONG_PRESS_OUT: {
        DELAY: States.ERROR,
        RESPONDER_GRANT: States.ERROR,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
        LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
        LONG_PRESS_DETECTED: States.ERROR
    },
    error: {
        DELAY: States.NOT_RESPONDER,
        RESPONDER_GRANT: States.RESPONDER_INACTIVE_PRESS_IN,
        RESPONDER_RELEASE: States.NOT_RESPONDER,
        RESPONDER_TERMINATED: States.NOT_RESPONDER,
        ENTER_PRESS_RECT: States.NOT_RESPONDER,
        LEAVE_PRESS_RECT: States.NOT_RESPONDER,
        LONG_PRESS_DETECTED: States.NOT_RESPONDER
    }
};

// ==== Typical Constants for integrating into UI components ====
// const HIT_EXPAND_PX = 20;
// const HIT_VERT_OFFSET_PX = 10;
export const HIGHLIGHT_DELAY_MS = 130;

export const PRESS_EXPAND_PX = 20;

export const LONG_PRESS_THRESHOLD = 500;

export const LONG_PRESS_DELAY_MS = LONG_PRESS_THRESHOLD - HIGHLIGHT_DELAY_MS;

export const LONG_PRESS_ALLOWED_MOVEMENT = 10;
// Default amount "active" region protrudes beyond box

export interface IResponderGestureState {
    /**
     *  ID of the gestureState- persisted as long as there at least one touch on
     */
    stateID?: number;
    pageX?: number;
    pageY?: number;
    /**
     *  the latest screen coordinates of the recently-moved touch
     */
    moveX?: number;

    /**
     *  the latest screen coordinates of the recently-moved touch
     */
    moveY?: number;

    /**
     * the screen coordinates of the responder grant
     */
    x0?: number;

    /**
     * the screen coordinates of the responder grant
     */
    y0?: number;

    /**
     * accumulated distance of the gesture since the touch started
     */
    dx?: number;

    /**
     * accumulated distance of the gesture since the touch started
     */
    dy?: number;

    /**
     * current velocity of the gesture
     */
    vx?: number;

    /**
     * current velocity of the gesture
     */
    vy?: number;

    /**
     * Number of touches currently on screen
     */
    numberActiveTouches?: number;

    // All `gestureState` accounts for timeStamps up until:
    _accountsForMovesUpTo?: number;
}

export interface IPanResponderCallbacks {
    onMoveShouldSetPanResponder?: (
        e: any,
        gestureState: IResponderGestureState
    ) => boolean;
    onStartShouldSetPanResponder?: (
        e: any,
        gestureState: IResponderGestureState
    ) => boolean;
    onResponderGrant?: (e: any, gestureState: IResponderGestureState) => void;
    onResponderMove?: (e: any, gestureState: IResponderGestureState) => void;
    onResponderRelease?: (e: any, gestureState: IResponderGestureState) => void;
    onResponderTerminate?: (
        e: any,
        gestureState: IResponderGestureState
    ) => void;

    onMoveShouldSetPanResponderCapture?: (
        e: any,
        gestureState: IResponderGestureState
    ) => boolean;
    onStartShouldSetPanResponderCapture?: (
        e: any,
        gestureState: IResponderGestureState
    ) => boolean;
    onResponderReject?: (e: any, gestureState: IResponderGestureState) => void;
    onResponderStart?: (e: any, gestureState: IResponderGestureState) => void;
    onResponderEnd?: (e: any, gestureState: IResponderGestureState) => void;
    onResponderTerminationRequest?: (
        e: any,
        gestureState: IResponderGestureState
    ) => boolean;
    onShouldBlockNativeResponder?: (
        e: any,
        gestureState: IResponderGestureState
    ) => boolean;
}
export interface ITouchable {
    fixClickPenetration?: boolean;
    disabled?: boolean;
    delayPressIn?: number;
    delayLongPress?: number;
    delayPressOut?: number;
    pressRetentionOffset?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    hitSlop?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    activeStyle?: any;
    inactiveStyle?: any;
    activeClassName?: string;
    inactiveClassName?: string;
    onPress?: (e?: any) => void;
    onLongPress?: (e?: any) => void;
    hasNoLongPress?: boolean;
    onPressIn?: (e?: any) => void;
    onPressOut?: (e?: any) => void;
    longPressCancelsPress?: boolean;
    onTouchMove?: (e?: any, touch?: object) => void;
    gestureResponder?: IPanResponderCallbacks;
}

const pressDelay = 200;
export let lastClickTime: any = 0;
export function isAllowPress(lctTime: number) {
    // avoid click penetration
    return Date.now() - lctTime >= pressDelay;
}

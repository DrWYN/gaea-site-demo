import React from "react";
import ReactTestUtils from "react-dom/test-utils";
// import { shallow, render } from "enzyme";
import renderer from "react-test-renderer";
import Touchable from "../index";
import * as ReactDOM from "react-dom";
import PressEvent, { shouldFirePress } from "../PressEvent";
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
} from "../wagas";

jest.mock("react-dom", () => ({
    findDOMNode: () => ({
        addEventListener: () => {},
        getBoundingClientRect:()=>({left:0,top:0})
    })
}));

describe("<Touchable />", () => {
    it("单指", () => {
        const component = renderer.create(
            <Touchable onPress={()=>{}}>
                <div />
            </Touchable>
        );
        const touchable = component.getInstance();
        touchable.onTouchStart({
            nativeEvent: {
                touches: [{ pageX: 0, pageY: 0 }],
                changedTouches: [{ pageX: 0, pageY: 0 }],
                preventDefault:()=>{},
            },
            preventDefault:()=>{},
        });
        touchable.onTouchMove({
            nativeEvent: {
                touches: [{ pageX: 2, pageY: 3 }],
                changedTouches: [{ pageX: 2, pageY: 3 }],
                preventDefault:()=>{},
            },
            preventDefault:()=>{},
        });
        touchable.onTouchEnd({
            nativeEvent: {
                touches: [{ pageX: 2, pageY: 3 }],
                changedTouches: [{ pageX: 2, pageY: 3 }],
                preventDefault:()=>{},
            },
            preventDefault:()=>{},
        });
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("双指", () => {
        const component = renderer.create(
            <Touchable onPress={()=>{}} onLongPress={()=>{}}>
                <div />
            </Touchable>
        );
        const touchable = component.getInstance();
        touchable.onTouchStart({
            nativeEvent: {
                touches: [{ pageX: 0, pageY: 0 },{ pageX: 0, pageY: 0 }],
                changedTouches: [{ pageX: 0, pageY: 0 },{ pageX: 0, pageY: 0 }],
                preventDefault:()=>{},
            },
            preventDefault:()=>{},
        });
        touchable.onTouchMove({
            nativeEvent: {
                touches: [{ pageX: 2, pageY: 3 },{ pageX: 0, pageY: 0 }],
                changedTouches: [{ pageX: 2, pageY: 3 },{ pageX: 0, pageY: 0 }],
                preventDefault:()=>{},
            },
            preventDefault:()=>{},
        });
        touchable.onTouchEnd({
            nativeEvent: {
                touches: [{ pageX: 2, pageY: 3 },{ pageX: 0, pageY: 0 }],
                changedTouches: [{ pageX: 2, pageY: 3 },{ pageX: 0, pageY: 0 }],
                preventDefault:()=>{},
            },
            preventDefault:()=>{},
        });
        expect(component.toJSON()).toMatchSnapshot();
    });
});

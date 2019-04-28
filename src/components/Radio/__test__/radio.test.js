import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Radio from "Components/Radio";
import Portal from "Components/Portal/index";

jest.mock("mall-merlin", () => {
    return {
        UserAgentUtil: {
            getPlatform: () => ({}),
            isPAJKApp: jest.fn(),
            isJSBApp: jest.fn(),
            isCYApp: jest.fn()
        },
        ChannelUtil: {
            getChannel: jest.fn(),
            getAppName: jest.fn(),
            getOutBizType: jest.fn()
        },
        FormatUtil: {
            moneyFToY: () => "",
            dateFormat: jest.fn()
        },
        LogUtil: { makelog: jest.fn() },
        Api: { request: val => Promise.resolve(val) },
        UrlUtil: { getUrlParamByName: () => "" },
        NativeUtil: { setTitle: jest.fn(), catchBack: jest.fn() },
        LocalStorageUtil: { getLocal: () => "" },
        ImageUtil: { getTfsImg: () => "" }
    };
});

describe("<Radio />", () => {
    it("no prop", () => {
        const component = mount(
            <div>
                <Radio />
                <Portal />
            </div>
        );
        expect(component).toMatchSnapshot();
    });
    it("props isSelected", () => {
        const component = mount(
            <Radio isSelected={false}/>
        );
        expect(component).toMatchSnapshot();
    });
    it("props className", () => {
        const component = mount(
            <Radio isSelected={true} className={'test'}/>
        );
        expect(component).toMatchSnapshot();
    });
    it("props disabled", () => {
        const component = mount(
            <Radio isSelected={true} disabled={true}/>
        );
        expect(component).toMatchSnapshot();
    });
    it("props onSelect", () => {
        const component = mount(
            <Radio isSelected={true} onSelect={jest.fn()}/>
        );
        expect(component).toMatchSnapshot();
    });
    it("props all", () => {
        const component = mount(
            <Radio isSelected={true} className={'test'} disabled={false} onSelect={jest.fn()}/>
        );
        expect(component).toMatchSnapshot();
    });

});

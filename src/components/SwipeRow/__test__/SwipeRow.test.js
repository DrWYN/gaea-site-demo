import React from 'react';
import renderer from 'react-test-renderer';
import SwipeRow from '../index';

jest.mock('mall-merlin', () => {
	return { 
    UserAgentUtil: { getPlatform: ()=>({}), isPAJKApp: jest.fn(),isJSBApp:jest.fn() ,isCYApp:jest.fn()},
    ChannelUtil: { getChannel: jest.fn(), getAppName: jest.fn(), getOutBizType: jest.fn(),  },
    FormatUtil: {
      moneyFToY: () => '', 
      dateFormat: jest.fn(), 
    },
    LogUtil:{makelog:jest.fn()},
    Api: { request: (val) => Promise.resolve(val) },
    UrlUtil: { getUrlParamByName: () => '' },
    NativeUtil: { setTitle: jest.fn() },
    LocalStorageUtil: { getLocal: () => '' },
    ImageUtil: { getTfsImg: () => '' }
  };
});

const props = {
  body: <div>test</div>,
};

describe('<SwipeRow />', () => {
  it('no props', () => {
    const component = renderer.create(
      <SwipeRow {...props}/>  
    );
    
    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('props', () => {
    const component = renderer.create(
      <SwipeRow
        body={<div/>}
        right={<div/>}
        left={<div/>}
        testID={'test'}
        directionalDistanceChangeThreshold={10}
      />
    );

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})

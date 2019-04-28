import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../index';
describe('<Text />', () => {
  it('no props', () => {
    const component = renderer.create(<Text />);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();

  });

  it('props testID', () => {
    const component = renderer.create(<Text testID="test"/>);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  
  it('props className', () => {
    const component = renderer.create(<Text className="class"/>);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  
  it('props numberOfLines', () => {
    const component = renderer.create(<Text numberOfLines={2}/>);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  
  it('props children', () => {
    const component = renderer.create(<Text>aaa <Text>bbb</Text></Text>);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

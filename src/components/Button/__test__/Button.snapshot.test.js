import React from 'react';
import each from 'jest-each';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Button from '../index';
import Touchable from 'Components/Touchable';

describe('<Button />', () => {
  each([
    // name   props
    ['no props', {}],
    ['props testID',  {testID: 'testID'}],
    ['props className',  {className: 'class'}],
    ['props style',  {style: {backgroundColor: 'red'}}],
    ['props disabled',  {disabled: true}],
    ['props textStyle',  {textStyle: {color: 'red'}}],
    ['props title',  {title: 'title'}],
    ['props icon',  {icon: 'back'}],
    ['props onPress', {onPress: jest.fn()}],
    ['props children', {children: 'children'}],
  ]).it(`test (%p): `, (name, props) => {
    const component = renderer.create(<Button {...props}/>);

    component.root.findAllByType(Touchable)[0].props.onPress();

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  // it('onPress', () => {
  //   const component = renderer.create(<Button />);
  //   component.root.findAllByType(Touchable)[0].props.onPress();
    
  //   let snapshot = component.toJSON();
  //   expect(snapshot).toMatchSnapshot();
  // });
})

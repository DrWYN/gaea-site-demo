import * as React from 'react';
import View from '../View/index';
import Touchable from 'Components/Touchable';
import styles from './index.module.scss';

interface ISwitchProps {
  testID?: string;
  className?: string;
  style?: any;
  thumbColor?: string;
  activeThumbColor?: string;
  disabledThumbColor?: string;
  trackColor?: string;
  activeTrackColor?: string;
  disabledTrackColor?: string;
  disabled?: boolean;
  value?: boolean; // 受控，组件的展示受这个值的控制
  onValueChange?: (value: boolean) => void;
}

interface ISwitchState {
  value: boolean
};

interface IStyle {
  width?: number;
  height?: number;
  borderRadius?: number;
  left?: number;
  backgroundColor?: string;
}

const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 24;

class Switch extends React.Component<ISwitchProps, ISwitchState> {

  constructor(props: ISwitchProps) {
    super(props);
  }

  onValueChange = () => {
    const { value, disabled = false, onValueChange } = this.props;

    if (disabled) {
      return;
    }

    if (typeof onValueChange === 'function') {
      onValueChange(!value);
    }
  }

  render() {
    const {
      className = '',
      thumbColor = '#fff',
      activeThumbColor = '#fff',
      disabledThumbColor = '#fff',
      trackColor = '#fff',
      activeTrackColor = '#5ecb7e',
      disabledTrackColor = '#e7e7e7',
      disabled = false,
      style = {},
      value,
      testID = ''
    } = this.props;
    const { width, height } = style;
    const classNameStr = `${disabled ? styles.disabled : (value ? styles.on : styles.off)} ${className}`;
    const trackStyle: IStyle = {
      backgroundColor: disabled ? disabledTrackColor : (value ? activeTrackColor : trackColor)
    };
    const thumbStyle: IStyle = {
      backgroundColor: disabled ? disabledThumbColor : (value ? activeThumbColor : thumbColor),
      left: disabled ? 0 : (value ? (width || DEFAULT_WIDTH) - (height || DEFAULT_HEIGHT) : 0)
    };

    if (width) {
      trackStyle.width = width;
    }
    if (height) {
      trackStyle.height = height;
      trackStyle.borderRadius = height;
      thumbStyle.width = height;
    }

    return (
      <Touchable onPress = {this.onValueChange}>
      <View
        className = {classNameStr}
        style = {{...style, ...trackStyle}}
        data-testid = {testID}
      >
        <View style={thumbStyle}/>
      </View>
      </Touchable>
    );
  }
}

export default Switch;

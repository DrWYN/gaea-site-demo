import * as React from 'react';
import Touchable from '../Touchable/index';
import Text from '../Text/index';
import View from '../View/index';
import IconFontText from '../IconFontText/index';

interface IButtonProps {
  testID?: string;
  className?: string;
  style?: object;
  disabled?: boolean;
  needThrottle?: boolean;
  textStyle?: object;
  title?: string;
  icon?: string;
  onPress?: (e: any) => void;
  children?: React.ReactNode;
}

class Button extends React.Component<IButtonProps> {
  pressTime: number;

  constructor(props: IButtonProps) {
    super(props);

    this.pressTime = new Date().getTime();
  }

  onPress = (e: any) => {
    const { disabled = false, needThrottle = true, onPress } = this.props;
    
    if (disabled) {
      return;
    }

    // 自定义是否需要防抖
    if(needThrottle) {
      // 200ms内防止重复点击
      const nowTime = new Date().getTime();
      if ((nowTime - this.pressTime) < 200) { return; }
      // 更新当前时间
      this.pressTime = new Date().getTime();
    }

    if (typeof onPress === 'function') {
      onPress(e);
    }
  }

  render() {
    const {
      testID,
      className,
      style,
      textStyle,
      title,
      icon,
      onPress,
      children,
      ...other
    } = this.props;

    return (
      <Touchable onPress={this.onPress} {...other}>
        <View
          className={`flex flex-center ${className}`}
          testID={testID}
          style={{...style}}
        >
        { !!icon && <IconFontText icon={icon} style={{...textStyle}} /> }
        { !!title && <Text style={{ ...textStyle }}>{title}</Text> }
        { !!children && children }
        </View>
      </Touchable>
    );
  }
}

export default Button;

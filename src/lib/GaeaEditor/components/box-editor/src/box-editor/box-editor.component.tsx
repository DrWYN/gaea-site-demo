import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Styled from './box-editor.style';
import * as typings from './box-editor.type';

export class BoxEditor extends React.Component<typings.Props, typings.State> {
  static defaultProps = new typings.Props();
  state = new typings.State();

  // 上一次鼠标 x, y 位置
  private lastX: number = null as any;
  private lastY: number = null as any;

  // 当前按住的类型
  private currentHolding: typings.MarginPaddingField = '';

  // 记录鼠标是否按下了
  private hasMouseDown = false;

  componentWillMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps: typings.Props) {
    this.init(nextProps);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { size=0 } = this.props;
    const normalBorderWidth = size / 4;
    const specialBorderWidth = size / 7;

    const containerStyle = {
      width: size,
      height: size - size / 5
    };

    const leftStyle = {
      left: specialBorderWidth,
      top: size / 2 - normalBorderWidth - size / 10
    };

    const topStyle = {
      top: specialBorderWidth,
      left: size / 2 - normalBorderWidth
    };

    const rightStyle = {
      right: specialBorderWidth,
      top: size / 2 - normalBorderWidth - size / 10
    };

    const bottomStyle = {
      bottom: specialBorderWidth,
      left: size / 2 - normalBorderWidth
    };

    const numberOuterLeftStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      left: 0,
      top: size / 2 - specialBorderWidth / 2 - size / 10
    };

    const numberOuterTopStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      top: 0,
      left: size / 2 - specialBorderWidth / 2
    };

    const numberOuterRightStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      right: 0,
      top: size / 2 - specialBorderWidth / 2 - size / 10
    };

    const numberOuterBottomStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      bottom: 0,
      left: size / 2 - specialBorderWidth / 2
    };

    const numberInnerLeftStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      left: size / 3 - specialBorderWidth / 2,
      top: size / 2 - specialBorderWidth / 2 - size / 10
    };

    const numberInnerTopStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      top: size / 3 - specialBorderWidth / 2,
      left: size / 2 - specialBorderWidth / 2
    };

    const numberInnerRightStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      right: size / 3 - specialBorderWidth / 2,
      top: size / 2 - specialBorderWidth / 2 - size / 10
    };

    const numberInnerBottomStyle = {
      width: specialBorderWidth,
      height: specialBorderWidth,
      bottom: size / 3 - specialBorderWidth / 2,
      left: size / 2 - specialBorderWidth / 2
    };

    const {
      paddingLeft=0, 
      paddingTop=0,
      paddingRight=0,
      paddingBottom=0,
      marginLeft=0,
      marginTop=0,
      marginRight=0,
      marginBottom=0
    } = this.state;

    return (
      <Styled.Container style={containerStyle}>
        <Styled.Left style={leftStyle}>
          {this.renderTriangle('right', 'marginLeft')}
          {this.renderTriangle('right', 'paddingLeft', { marginLeft: 5 })}
        </Styled.Left>
        <Styled.Right style={rightStyle}>
          {this.renderTriangle('left', 'paddingRight')}
          {this.renderTriangle('left', 'marginRight', { marginLeft: 5 })}
        </Styled.Right>
        <Styled.Top style={topStyle}>
          {this.renderTriangle('bottom', 'marginTop')}
          {this.renderTriangle('bottom', 'paddingTop', { marginTop: 5 })}
        </Styled.Top>
        <Styled.Bottom style={bottomStyle}>
          {this.renderTriangle('top', 'paddingBottom')}
          {this.renderTriangle('top', 'marginBottom', { marginTop: 5 })}
        </Styled.Bottom>

        <Styled.NumberBox style={numberOuterLeftStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'marginLeft')}
            onMouseLeave={this.handleInputLeave.bind(this, 'marginLeft')}
            onChange={this.handleChange.bind(this, 'marginLeft')}
            value={marginLeft.toString()}
          />
        </Styled.NumberBox>
        <Styled.NumberBox style={numberOuterTopStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'marginTop')}
            onMouseLeave={this.handleInputLeave.bind(this, 'marginTop')}
            onChange={this.handleChange.bind(this, 'marginTop')}
            value={marginTop.toString()}
          />
        </Styled.NumberBox>
        <Styled.NumberBox style={numberOuterRightStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'marginRight')}
            onMouseLeave={this.handleInputLeave.bind(this, 'marginRight')}
            onChange={this.handleChange.bind(this, 'marginRight')}
            value={marginRight.toString()}
          />
        </Styled.NumberBox>
        <Styled.NumberBox style={numberOuterBottomStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'marginBottom')}
            onMouseLeave={this.handleInputLeave.bind(this, 'marginBottom')}
            onChange={this.handleChange.bind(this, 'marginBottom')}
            value={marginBottom.toString()}
          />
        </Styled.NumberBox>

        <Styled.NumberBox style={numberInnerLeftStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'paddingLeft')}
            onMouseLeave={this.handleInputLeave.bind(this, 'paddingLeft')}
            onChange={this.handleChange.bind(this, 'paddingLeft')}
            value={paddingLeft.toString()}
          />
        </Styled.NumberBox>
        <Styled.NumberBox style={numberInnerTopStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'paddingTop')}
            onMouseLeave={this.handleInputLeave.bind(this, 'paddingTop')}
            onChange={this.handleChange.bind(this, 'paddingTop')}
            value={paddingTop.toString()}
          />
        </Styled.NumberBox>
        <Styled.NumberBox style={numberInnerRightStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'paddingRight')}
            onMouseLeave={this.handleInputLeave.bind(this, 'paddingRight')}
            onChange={this.handleChange.bind(this, 'paddingRight')}
            value={paddingRight.toString()}
          />
        </Styled.NumberBox>
        <Styled.NumberBox style={numberInnerBottomStyle}>
          <Styled.Input
            onMouseEnter={this.handleInputEnter.bind(this, 'paddingBottom')}
            onMouseLeave={this.handleInputLeave.bind(this, 'paddingBottom')}
            onChange={this.handleChange.bind(this, 'paddingBottom')}
            value={paddingBottom.toString()}
          />
        </Styled.NumberBox>
      </Styled.Container>
    );
  }

  /**
   * 初始化值
   */
  private init = (props: typings.Props) => {
    this.setState({
      paddingLeft: props.paddingLeft || 0,
      paddingTop: props.paddingTop || 0,
      paddingRight: props.paddingRight || 0,
      paddingBottom: props.paddingBottom || 0,
      marginLeft: props.marginLeft || 0,
      marginTop: props.marginTop || 0,
      marginRight: props.marginRight || 0,
      marginBottom: props.marginBottom || 0
    });
  };

  /**
   * 鼠标按下
   */
  private handleMouseDown = (name: typings.MarginPaddingField, event: MouseEvent) => {
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.currentHolding = name;
    this.hasMouseDown = true;
    const { onStart } = this.props;
    onStart && onStart();
  };

  /**
   * 鼠标移动监听处理
   */
  private handleMouseMove = (event: MouseEvent) => {
    const diffX = event.clientX - this.lastX;
    const diffY = event.clientY - this.lastY;
    const { onChange } = this.props;
    switch (this.currentHolding) {
      case 'marginLeft':
        this.setState(state => ({
          marginLeft: (state.marginLeft) - diffX
        }));
        onChange && onChange(this.currentHolding, this.state.marginLeft);
        break;
      case 'paddingLeft':
        this.setState(state => ({
          paddingLeft: state.paddingLeft - diffX
        }));
        onChange && onChange(this.currentHolding, this.state.paddingLeft);
        break;
      case 'marginRight':
        this.setState(state => ({
          marginRight: state.marginRight + diffX
        }));
        onChange && onChange(this.currentHolding, this.state.marginRight);
        break;
      case 'paddingRight':
        this.setState(state => ({
          paddingRight: state.paddingRight + diffX
        }));
        onChange && onChange(this.currentHolding, this.state.paddingRight);
        break;
      case 'marginTop':
        this.setState(state => ({
          marginTop: state.marginTop - diffY
        }));
        onChange && onChange(this.currentHolding, this.state.marginTop);
        break;
      case 'paddingTop':
        this.setState(state => ({
          paddingTop: state.paddingTop - diffY
        }));
        onChange && onChange(this.currentHolding, this.state.paddingTop);
        break;
      case 'marginBottom':
        this.setState(state => ({
          marginBottom: state.marginBottom + diffY
        }));
        onChange && onChange(this.currentHolding, this.state.marginBottom);
        break;
      case 'paddingBottom':
        this.setState(state => ({
          paddingBottom: state.paddingBottom + diffY
        }));
        onChange && onChange(this.currentHolding, this.state.paddingBottom);
        break;
    }
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  };

  /**
   * 鼠标松开
   */
  private handleMouseUp = () => {
    if (!this.hasMouseDown) {
      return;
    }
    this.hasMouseDown = false;

    // 清空前，调用低频修改
    const { onFinalChange } = this.props;
    onFinalChange && onFinalChange(this.currentHolding, this.state[this.currentHolding]);

    this.currentHolding = '';
  };

  /**
   * 输入框调用的修改
   */
  private handleChange = (name: typings.MarginPaddingField, event: any) => {
    const value = Number(event.target.value) || 0;
    this.setState({
      [name]: value
    });
    const { onChange, onFinalChange } = this.props;
    onChange && onChange(name, value);
    onFinalChange && onFinalChange(name, value);
  };

  private renderTriangle = (position: string, name: string, extendStyle: React.CSSProperties = {}) => {
    const style: React.CSSProperties = {
      ...extendStyle,
      width: 0,
      height: 0
    };
    const outerStyle: React.CSSProperties = {};

    const { size=0 } = this.props;
    const normalBorderWidth = size / 4;
    const specialBorderWidth = size / 5;
    const outerWidth = size / 20;
    const outerSpace = size / 40;

    switch (position) {
      case 'left':
        style.borderTop = `${normalBorderWidth}px solid transparent`;
        style.borderBottom = `${normalBorderWidth}px solid transparent`;
        style.borderRightStyle = 'solid';
        style.borderRightWidth = specialBorderWidth;
        outerStyle.width = outerWidth;
        break;
      case 'top':
        style.borderLeft = `${normalBorderWidth}px solid transparent`;
        style.borderRight = `${normalBorderWidth}px solid transparent`;
        style.borderBottomStyle = 'solid';
        style.borderBottomWidth = specialBorderWidth;
        outerStyle.height = outerWidth;
        break;
      case 'right':
        style.borderTop = `${normalBorderWidth}px solid transparent`;
        style.borderBottom = `${normalBorderWidth}px solid transparent`;
        style.borderLeftStyle = 'solid';
        style.borderLeftWidth = specialBorderWidth;
        outerStyle.width = outerWidth;
        break;
      case 'bottom':
        style.borderLeft = `${normalBorderWidth}px solid transparent`;
        style.borderRight = `${normalBorderWidth}px solid transparent`;
        style.borderTopStyle = 'solid';
        style.borderTopWidth = specialBorderWidth;
        outerStyle.height = outerWidth;
        break;
    }

    switch (name) {
      case 'marginLeft':
        style.marginLeft = 0;
        break;
      case 'paddingLeft':
        style.marginLeft = -outerWidth;
        outerStyle.marginLeft = outerSpace;
        break;
      case 'marginTop':
        style.marginTop = 0;
        break;
      case 'paddingTop':
        style.marginTop = -outerWidth;
        outerStyle.marginTop = outerSpace;
        break;
      case 'marginRight':
        style.marginLeft = -outerWidth * 3;
        outerStyle.marginLeft = outerSpace;
        break;
      case 'paddingRight':
        style.marginLeft = -specialBorderWidth / 2;
        break;
      case 'marginBottom':
        style.marginTop = -outerWidth * 3;
        outerStyle.marginTop = outerSpace;
        break;
      case 'paddingBottom':
        style.marginTop = -specialBorderWidth / 2;
        break;
    }

    return (
      <Styled.ButtonContainer style={outerStyle}>
        <Styled.ButtonTriangle
          draggable={false}
          onMouseDown={this.handleMouseDown.bind(this, name)}
          style={style}
          theme={{ position }}
        />
      </Styled.ButtonContainer>
    );
  };

  private handleInputLeave = (name: typings.MarginPaddingField) => {
    if (this.currentHolding !== '') {
      return;
    }
    const inputElement = ReactDOM.findDOMNode(this.refs[name + 'Input']) as HTMLInputElement;
    if (inputElement) {
      inputElement.blur();
    }
  };

  private handleInputEnter = (name: typings.MarginPaddingField) => {
    if (this.currentHolding !== '') {
      return;
    }
    const inputElement = ReactDOM.findDOMNode(this.refs[name + 'Input']) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
      inputElement.select();
    }
  };
}

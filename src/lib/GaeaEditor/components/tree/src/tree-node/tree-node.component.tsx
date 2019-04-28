import * as React from 'react';
import * as Styled from './tree-node.style';
import * as typings from './tree-node.type';

export class TreeNode extends React.Component<typings.Props, typings.State> {
  static defaultProps = new typings.Props();
  state = new typings.State();

  componentWillMount() {
    this.setState((_, props) => ({
      showChildren: props.defaultExpendAll || props.showChildren
    }));
  }

  handleContainerClick = (event: Event) => {
    const { onClick } = this.props;
    onClick && onClick(event);
    if (!this.props.toggleByArrow) {
      this.setState(state => ({
        showChildren: !state.showChildren
      }));
      if (this.props.onToggleShow) {
        this.props.onToggleShow(event);
      }
    }
  };

  handleArrowClick = (event: Event) => {
    event.stopPropagation();

    this.setState(state => ({
      showChildren: !state.showChildren
    }));
    if (this.props.onToggleShow) {
      this.props.onToggleShow(event);
    }
  };

  render() {
    const childrenStyle = {
      display: this.state.showChildren ? 'block' : null
    };

    const Children = React.Children.map(this.props.children, (item: any) => {
      if (item) {
        return React.cloneElement(item, {
          defaultExpendAll: this.props.defaultExpendAll,
          toggleByArrow: this.props.toggleByArrow
        });
      }
      return null;
    });

    const { title, render } = this.props;

    return (
      <Styled.Container>
        <Styled.Title onClick={this.handleContainerClick.bind(this)} onMouseOver={this.props.onMouseOver as any}>
          {React.Children.count(this.props.children) > 0 ? (
            <Styled.TitleCaret theme={{ down: this.state.showChildren }} onClick={this.handleArrowClick.bind(this)}>
              {renderCaret()}
            </Styled.TitleCaret>
          ) : (
            <Styled.EmptyCaret />
          )}
          { title || render && render()}
        </Styled.Title>

        <Styled.Children style={childrenStyle}>{Children ? Children : null}</Styled.Children>
      </Styled.Container>
    );
  }
}

function renderCaret() {
  return (
    <svg viewBox="0 0 1024 1024" width="15" height="15">
      <path d="M72.126714 862.823134l156.99052-398.326031L72.126714 66.179258l876.308263 398.317845L72.126714 862.823134z" />
    </svg>
  );
}

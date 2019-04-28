import * as React from 'react';
import IconFontText from '../IconFontText';

import styles from './style.module.scss';

interface IRadioProps {
    className?: string;
    isSelected: boolean;
    disabled?: boolean;
    onSelect?: () => void;
}
interface IRadioState {
    isSelected: boolean;
}

class Radio extends React.Component<IRadioProps, IRadioState>{
    constructor(props: IRadioProps) {
        super(props);
        this.state = {
            isSelected: this.props.isSelected
        }
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            isSelected: nextProps.isSelected
        })
    }

    onClick = () => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        const { onSelect } = this.props;
        if ('function' === typeof onSelect) {
            onSelect();
        }
        // this.setState({
        //     isSelected: !this.state.isSelected
        // }, () => {
        //     const { onSelect } = this.props;
        //     if ('function' === typeof onSelect) {
        //         onSelect();
        //     }
        // });
    }

    render() {
        const { className, disabled } = this.props;
        const { isSelected } = this.state;
        const icon = isSelected ? "check" : "circle";
        const rootClass = disabled ? `${styles.radioRoot} ${styles.disabled}` : isSelected ? `${styles.radioRoot} ${styles.radioSelected}` : styles.radioRoot;
        return (
            <span className={`${rootClass} ${className}`}
                onClick={this.onClick}>
                <IconFontText icon={icon} />
            </span>
        )
    }
}

export default Radio;
import { Connect } from 'dob-react';
import { PureComponent } from '../../utils/react-helper';

// tslint:disable-next-line:no-var-requires
const keymaster = require('keymaster');

@Connect
class Delete extends PureComponent {
  componentDidMount() {
    keymaster('backspace', this.delete);
  }

  componentWillUnmount() {
    keymaster.unbind('backspace');
  }

  render() {
    return null as any;
  }

  private delete = () => {
    if (!this.props.stores.ViewportStore.currentHoverInstanceKey) {
      return;
    }
    this.props.actions.ViewportAction.removeInstance(this.props.stores.ViewportStore.currentHoverInstanceKey);
  };
}

export default {
  position: 'navbarRight',
  class: Delete
};

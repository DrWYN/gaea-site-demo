import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {
  /**
   * injected
   */
  realField: string;
  editor: IEditor;
}

export class State {}

import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {
  /**
   * Real value field
   */
  realField: string;
  /**
   * Editor
   */
  editor: IEditor;
}

export class State {}

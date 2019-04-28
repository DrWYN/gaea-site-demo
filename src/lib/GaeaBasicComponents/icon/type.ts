export class Props {
  editSetting = {
    key: 'gaea-icon',
    name: 'Icon',
    editors: [
      'Layout',
      {
        text: 'Box editor'
      },
      'Function',
      {
        field: 'type',
        text: 'Type',
        type: 'string'
      },
      'Style',
      {
        field: 'spin',
        text: 'Spin',
        type: 'boolean'
      }
    ]
  };

  style: React.CSSProperties = {};
  type: string = 'search';
  spin = false;
}

export class State {}

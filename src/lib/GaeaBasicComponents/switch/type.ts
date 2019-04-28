export class Props {
  editSetting = {
    key: 'gaea-switch',
    name: 'Switch',
    editors: [
      'Layout',
      {
        type: 'box-editor'
      },
      'Function',
      {
        field: 'checked',
        text: 'Checked',
        type: 'boolean'
      },
      {
        field: 'checkedChildren',
        text: 'CheckedChildren',
        type: 'string'
      },
      {
        field: 'unCheckedChildren',
        text: 'UnCheckedChildren',
        type: 'string'
      },
      {
        field: 'loading',
        text: 'Loading',
        type: 'boolean'
      },
      'Style',
      {
        field: 'size',
        text: 'Size',
        type: 'select',
        data: [
          {
            text: 'Default',
            value: 'default'
          },
          {
            text: 'Small',
            value: 'small'
          }
        ]
      }
    ],
    events: [
      {
        text: 'onChange',
        field: 'onChange'
      }
    ]
  };

  checked = false;
  checkedChildren: string = null;
  unCheckedChildren: string = null;
  loading = false;
  size: 'default' | 'small' = 'default';
  onChange = (checked?: boolean) => {
    //
  };
}

export class State {}

// type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';

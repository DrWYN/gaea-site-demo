export class Props {
  editSetting = {
    key: 'gaea-button',
    name: 'Button',
    editors: [
      'Layout',
      {
        type: 'box-editor'
      },
      'Function',
      {
        field: 'text',
        text: 'Text',
        type: 'string'
      },
      {
        field: 'href',
        text: 'Href',
        type: 'string'
      },
      {
        field: 'target',
        text: 'Target',
        type: 'string'
      },
      'Style',
      {
        field: 'type',
        text: 'Type',
        type: 'select',
        data: [
          {
            value: null,
            text: 'Default'
          },
          {
            value: 'primary',
            text: 'Primary'
          },
          {
            value: 'dashed',
            text: 'Dashed'
          },
          {
            value: 'danger',
            text: 'Danger'
          }
        ]
      },
      {
        field: 'ghost',
        text: 'Transparent',
        type: 'boolean'
      },
      {
        field: 'icon',
        text: 'Icon',
        type: 'string'
      },
      {
        field: 'loading',
        text: 'Loading',
        type: 'boolean'
      },
      {
        field: 'shape',
        text: 'Shape',
        type: 'select',
        data: [
          {
            value: null,
            text: 'Default'
          },
          {
            value: 'circle',
            text: 'Circle'
          }
        ]
      },
      {
        field: 'size',
        text: 'Size',
        type: 'select',
        data: [
          {
            value: null,
            text: 'Default'
          },
          {
            value: 'small',
            text: 'Small'
          },
          {
            value: 'large',
            text: 'Large'
          }
        ]
      }
    ],
    events: [
      {
        text: 'OnClick',
        field: 'onClick'
      }
    ]
  };

  style: React.CSSProperties = {};
  text: string = 'Button Text';
  type: ButtonType = null;
  ghost = false;
  href: any = null;
  icon = '';
  loading = false;
  shape: string = null;
  size: string = null;
  target: any = null;
  onClick = () => {
    //
  };
}

export class State {}

type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';

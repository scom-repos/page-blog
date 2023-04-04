import {
  Module,
  customModule,
  Styles,
  Panel,
  Label,
  VStack,
  Icon,
  ControlElement,
  customElements,
  Container,
  IDataSchema,
  moment
} from '@ijstech/components';
import { PageBlock, IConfig, IPageBlockAction } from './global/index';
import { cardItemStyle, cardStyle, imageStyle, avatarStyle, imageOverlayStyle, containerStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;
const configSchema = {
  type: 'object',
  required: [],
  properties: {
    titleFontColor: {
      type: 'string',
      format: 'color',
    },
    descriptionFontColor: {
      type: 'string',
      format: 'color',
    },
    linkTextColor: {
      type: 'string',
      format: 'color',
    },
    dateColor: {
      type: 'string',
      format: 'color',
    },
    userNameColor: {
      type: 'string',
      format: 'color',
    },
    backgroundColor: {
      type: 'string',
      format: 'color',
    }
  }
}

const propertiesSchema: IDataSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    linkUrl: {
      type: 'string'
    },
    isExternal: {
      type: 'boolean'
    },
    date: {
      type: 'string',
      format: 'date'
    },
    backgroundImage: {
      type: 'string'
    },
    userName: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    }
  }
};

const defaultColors = {
  dateColor: '#565656',
  userNameColor: '#565656',
  overlayBackgroundColor: '#fff'
}

interface ScomBlogElement extends ControlElement {
  data?: IConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-blog']: ScomBlogElement;
    }
  }
}

@customModule
@customElements('i-scom-blog')
export default class Blog extends Module implements PageBlock {
  private pnlCard: Panel;
  private pnlCardBody: Panel;

  private _oldData: IConfig = {
    title: '',
    backgroundImage: ''
  };
  private _data: IConfig = {
    title: '',
    backgroundImage: ''
  };
  private oldTag: any = {};
  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  static async create(options?: ScomBlogElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomBlogElement) {
    super(parent, options);
  }

  init() {
    super.init();
    const data = this.getAttribute('data', true);
    if (data) {
      this.setData(data);
    }
  }

  getData() {
    return this._data;
  }

  async setData(data: IConfig) {
    this._oldData = { ...this._data };
    this._data = data
    this.onUpdateBlock(this.tag);
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
    this.onUpdateBlock(value);
  }

  getConfigSchema() {
    return configSchema;
  }

  onConfigSave(config: any) {
    this.tag = config;
    this.onUpdateBlock(config);
  }

  async edit() {
  }

  async confirm() {
    this.onUpdateBlock(this.tag);
  }

  async discard() {
  }

  async config() {}

  getActions() {
    const themeSchema: IDataSchema = {
      type: 'object',
      properties: {
        titleFontColor: {
          type: 'string',
          format: 'color',
        },
        descriptionFontColor: {
          type: 'string',
          format: 'color',
        },
        linkTextColor: {
          type: 'string',
          format: 'color',
        },
        dateColor: {
          type: 'string',
          format: 'color',
        },
        userNameColor: {
          type: 'string',
          format: 'color',
        },
        backgroundColor: {
          type: 'string',
          format: 'color',
        }
      }
    };
    return this._getActions(propertiesSchema, themeSchema);
  }

  _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions: IPageBlockAction[] = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          return {
            execute: async () => {
              if (builder?.setData) builder.setData(userInputData);
              this.setData(userInputData);
            },
            undo: () => {
              if (builder?.setData) builder.setData(this._oldData);
              this.setData(this._oldData);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema
      },
      {
        name: 'Theme Settings',
        icon: 'palette',
        command: (builder: any, userInputData: any) => {
          return {
            execute: async () => {
              if (!userInputData) return;
              this.oldTag = { ...this.tag };
              this.setTag(userInputData);
              if (builder) builder.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.setTag(this.oldTag);
              if (builder) builder.setTag(this.oldTag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: themeSchema
      }
    ];
    return actions;
  }

  private onUpdateBlock(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
      linkTextColor = Theme.colors.primary.main,
      dateColor = defaultColors.dateColor,
      userNameColor = defaultColors.userNameColor
    } = config || {};
    this.pnlCardBody.clearInnerHTML();
    this.pnlCardBody.appendChild(
      <i-grid-layout
        width="100%"
        height="100%"
        class={cardItemStyle}
        border={{ radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }}
        templateAreas={
          [
            ["areaImg"], ["areaDate"], ["areaDetails"]
          ]
        }
        onClick={() => this.openLink()}
      >
        <i-panel overflow={{x: 'hidden', y: 'hidden'}} position="relative" padding={{top: '56.25%'}}>
          <i-image
            class={imageStyle}
            width='100%'
            height="100%"
            grid={{ area: "areaImg" }}
            url={this._data.backgroundImage}
            position="absolute" left="0px" top="0px"
          ></i-image>
        </i-panel>
        <i-panel padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
          <i-hstack grid={{ area: "areaDate" }} verticalAlignment="center" gap="0.938rem" margin={{bottom: '0.75rem'}}>
            <i-panel width={50} height={50} visible={!!this._data.avatar}>
              <i-image width="100%" height="100%" url={this._data.avatar} display="block" class={avatarStyle}></i-image>
            </i-panel>
            <i-vstack verticalAlignment="center" gap="0.25rem">
              <i-label
                id="dateLb"
                visible={!!this._data.date}
                caption={this.formatDate(this._data.date)}
                font={{ size: '0.8125rem', color: dateColor }}
              ></i-label>
              <i-label
                id="usernameLb"
                visible={!!this._data.userName}
                caption={this._data.userName}
                font={{ size: '0.8125rem', color: userNameColor }}
              ></i-label>
            </i-vstack>
          </i-hstack>
          <i-vstack grid={{ area: "areaDetails" }} verticalAlignment="center" gap="0.5rem" padding={{ bottom: '1rem' }}>
            <i-label id="titleLb" caption={this._data.title} font={{ weight: 700, size: '1.375rem', color: titleFontColor }}></i-label>
            <i-label id="descriptionLb" caption={this._data.description} font={{ size: '0.875rem', color: descriptionFontColor }}></i-label>
            <i-label
              id="linkLb"
              caption="Read More"
              link={{ href: this._data.linkUrl, target: this._data.isExternal ? "_blank" :  "_self" }}
              font={{ weight: 700, size: '0.875rem', color: linkTextColor }}
            ></i-label>
          </i-vstack>
        </i-panel>
      </i-grid-layout>
    )
  }

  private formatDate(date: any) {
    if (!date) return '';
    return moment(date).format('MMMM DD, YYYY');
  }

  private openLink() {
    if (!this._data.linkUrl) return;
    if (this._data.isExternal)
      window.open(this._data.linkUrl);
    else
      window.location.href = this._data.linkUrl;
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={cardStyle}>
        <i-panel id="pnlCard">
          <i-panel class={containerStyle}>
            <i-panel id="pnlCardBody"></i-panel>
          </i-panel>
        </i-panel>
      </i-panel>
    )
  }
}
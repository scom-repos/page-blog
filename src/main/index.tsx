import {
  Module,
  customModule,
  Styles,
  Panel,
  Label,
  VStack,
  Icon
} from '@ijstech/components';
import { PageBlock, IConfig } from '@blog/global';
import Config from '@blog/config';
import { cardItemStyle, cardStyle, imageStyle, avatarStyle, imageOverlayStyle, containerStyle } from './index.css';
import Alert from '@blog/alert';
export { Config };

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
    overlayBackgroundColor: {
      type: 'string',
      format: 'color',
    }
  }
}

@customModule
export default class Blog extends Module implements PageBlock {
  private pnlCard: Panel;
  private pnlCardBody: Panel;
  private cardConfig: Config;
  private alertElm: Alert;

  private titleLb: Label;
  private descriptionLb: Label;
  private linkLb: Label;
  private usernameLb: Label;
  private dateLb: Label;
  private overlayStack: VStack;
  private dateIcon: Icon;
  private usernameIcon: Icon;

  private _data: IConfig = {
    title: '',
    backgroundImage: ''
  };
  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  getData() {
    return this._data;
  }

  async setData(data: IConfig) {
    this._data = data;
    this.cardConfig.data = data;
    this.onUpdateBlock(this.tag);
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
    this.onUpdateSettings(value);
  }

  getConfigSchema() {
    return configSchema;
  }

  onConfigSave(config: any) {
    this.tag = config;
    this.onUpdateSettings(config);
  }

  async edit() {
    this.cardConfig.data = this._data;
    this.pnlCard.visible = false;
    this.cardConfig.visible = true;
  }

  async confirm() {
    this._data = this.cardConfig.data;
    this.onUpdateBlock(this.tag);
    this.pnlCard.visible = true;
    this.cardConfig.visible = false;
  }

  async discard() {
    this.pnlCard.visible = true;
    this.cardConfig.visible = false;
  }

  async config() {}

  validate() {
    const data = this.cardConfig.data;
    const emptyProp = !data.title || !data.backgroundImage;
    if (emptyProp) {
      this.alertElm.message = {
        status: 'error',
        content: 'Required field is missing.'
      }
      this.alertElm.showModal();
      return false;
    }
    return true;
  }

  private onUpdateBlock(config: any) {
    const isOverlay = this._data.textOverlay || false;
    isOverlay ? this.renderOverlay(config) : this.renderNoOverlay(config);
  }

  private onUpdateSettings(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
      linkTextColor = Theme.colors.primary.main,
      dateColor = '#565656',
      userNameColor = '#565656',
      overlayBackgroundColor
    } = config || {};
    this.titleLb.font = { weight: 700, size: '1.25rem', color: titleFontColor };
    this.descriptionLb.font = { size: '0.875rem', color: descriptionFontColor };
    if (this.dateLb)
      this.dateLb.font = { size: '0.75rem', color: dateColor };
    if (this.dateIcon)
      this.dateIcon.fill = dateColor;
    if (this.usernameLb)
      this.usernameLb.font = { size: '0.75rem', color: userNameColor };
    if (this.usernameIcon)
      this.usernameIcon.fill = userNameColor;
    if (this.linkLb)
      this.linkLb.font = { weight: 700, size: '0.875rem', color: linkTextColor };
    if (this.overlayStack)
      this.overlayStack.background = { color: overlayBackgroundColor };
  }

  private formatDate(date: any) {
    if (!date) return '';
    return date.format('MMMM DD, YYYY');
  }

  private openLink() {
    if (!this._data.linkUrl) return;
    if (this._data.isExternal)
      window.open(this._data.linkUrl);
    else
      window.location.href = this._data.linkUrl;
  }

  private renderNoOverlay(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
      linkTextColor = Theme.colors.primary.main,
      dateColor = '#565656',
      userNameColor = '#565656'
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
        <i-panel padding={{ top: '0.938rem', bottom: '0.938rem', left: '0.938rem', right: '0.938rem' }}>
          <i-hstack grid={{ area: "areaDate" }} verticalAlignment="center" gap="0.938rem" margin={{bottom: '1.875rem'}}>
            <i-panel width={50} height={50} visible={!!this._data.avatar}>
              <i-image width="100%" height="100%" url={this._data.avatar} display="block" class={avatarStyle}></i-image>
            </i-panel>
            <i-vstack verticalAlignment="center" >
              <i-label
                id="dateLb"
                caption={this.formatDate(this._data.date)}
                font={{ size: '0.75rem', color: dateColor }}
              ></i-label>
              <i-label
                id="usernameLb"
                caption={this._data.userName}
                font={{ size: '0.75rem', color: userNameColor }}
              ></i-label>
            </i-vstack>
          </i-hstack>
          <i-vstack grid={{ area: "areaDetails" }} verticalAlignment="center" gap="0.25rem" padding={{ bottom: '1rem' }}>
            <i-panel minHeight="3rem">
              <i-label id="titleLb" caption={this._data.title} font={{ weight: 700, size: '1.25rem', color: titleFontColor }}></i-label>
              <i-label id="descriptionLb" caption={this._data.description} font={{ size: '0.875rem', color: descriptionFontColor }}></i-label>
            </i-panel>
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

  private renderOverlay(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
      dateColor = '#565656',
      userNameColor = '#565656',
      overlayBackgroundColor = '#fff'
    } = config || {};
    this.pnlCardBody.clearInnerHTML();
    this.pnlCardBody.appendChild(
      <i-grid-layout
        width="100%"
        height="100%"
        minHeight={200}
        class={cardItemStyle}
        border={{ radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }}
        gap={{ column: '1rem', row: '1rem' }}
        templateAreas={
          [
            ["areaImg"], ["areaDetails"], ["areaDate"]
          ]
        }
        position="relative"
        onClick={() => this.openLink()}
      >
        <i-panel overflow={{ x: 'hidden', y: 'hidden' }} position="relative" padding={{ top: '50%' }}>
          <i-image
            class={imageOverlayStyle}
            width='100%'
            height='100%'
            grid={{ area: "areaImg" }}
            url={this._data.backgroundImage}
            position="absolute" left="0px" top="0px"
          ></i-image>
        </i-panel>
        <i-vstack
          id="overlayStack"
          background={{ color: overlayBackgroundColor }}
          padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
          position="absolute" width="100%" zIndex={9}
          bottom="0px" left="0px"
          gap="0.5rem"
        >
          <i-vstack grid={{ area: "areaDetails" }} verticalAlignment="center" minHeight="3rem">
            <i-label id="titleLb" caption={this._data.title} font={{ weight: 700, size: '1.25rem', color: titleFontColor }}></i-label>
            <i-label id="descriptionLb" caption={this._data.description} font={{size: '0.875rem', color: descriptionFontColor}}></i-label>
          </i-vstack>
          <i-hstack grid={{ area: "areaDate" }} gap="10px" verticalAlignment="center">
            <i-hstack gap="4px" visible={!!this._data.date} verticalAlignment="center">
              <i-icon id="dateIcon" name="calendar" width={12} height={12} fill={dateColor}></i-icon>
              <i-label id="dateLb" caption={this.formatDate(this._data.date)} font={{ size: '0.75rem', color: dateColor }}></i-label>
            </i-hstack>
            <i-hstack gap="4px" visible={!!this._data.userName} verticalAlignment="center">
              <i-icon id="usernameIcon" name="eye" width={12} height={12} fill={userNameColor}></i-icon>
              <i-label id="usernameLb" caption={this._data.userName} font={{ size: '0.75rem', color: userNameColor }}></i-label>
            </i-hstack>
          </i-hstack>
        </i-vstack>
      </i-grid-layout>
    )
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={cardStyle}>
        <i-panel id="pnlCard">
          <i-panel class={containerStyle}>
            <i-panel id="pnlCardBody"></i-panel>
          </i-panel>
        </i-panel>
        <pageblock-blog-config id="cardConfig" visible={false} />
        <pageblock-blog-alert id="alertElm" />
      </i-panel>
    )
  }
}
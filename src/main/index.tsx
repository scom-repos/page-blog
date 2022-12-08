import {
  Module,
  customModule,
  Styles,
  Panel,
  moment
} from '@ijstech/components';
import { PageBlock, IConfig } from '@blog/global';
import Config from '@blog/config';
import { cardItemStyle, cardStyle, imageStyle, avatarStyle } from './index.css';
export { Config };

const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Blog extends Module implements PageBlock {
  private pnlCard: Panel;
  private pnlCardBody: Panel;
  private cardConfig: Config;
  // private pnlCardHeader: HStack;
  // private pnlCardFooter: Panel;
  // private pnlControls: HStack;

  private _data: IConfig = {};
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
    this.onUpdateBlock();
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
  }

  async edit() {
    this.cardConfig.data = this._data;
    this.pnlCard.visible = false;
    this.cardConfig.visible = true;
  }

  async confirm() {
    this._data = this.cardConfig.data;
    this.onUpdateBlock();
    this.pnlCard.visible = true;
    this.cardConfig.visible = false;
  }

  async discard() {
    this.pnlCard.visible = true;
    this.cardConfig.visible = false;
  }

  async config() { }

  validate() {
    const data = this.cardConfig.data;
    const emptyName = !data.title || !data.background;
    return !emptyName;
  }

  onUpdateBlock() {
    this.renderUI();
  }

  formatDate(date: any) {
    if (!date) return '';
    return date.format('MMMM DD, YYYY');
  }

  renderUI() {
    const isOverlay = this._data.overlay || false;
    if (isOverlay)
      this.renderOverlay()
    else
      this.renderNoOverlay()
  }

  renderNoOverlay() {
    this.pnlCardBody.clearInnerHTML();
    this.pnlCardBody.appendChild(
      <i-grid-layout
        width="100%"
        height="100%"
        class={cardItemStyle}
        padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
        border={{ radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }}
        gap={{ column: '1rem', row: '1rem' }}
        templateAreas={
          [
            ["areaImg"], ["areaDate"], ["areaDetails"]
          ]
        }
        onClick={() => window.location.href = (this._data.viewAllUrl || '')}
      >
        <i-image
          class={imageStyle}
          width='auto'
          maxHeight={100}
          overflow="hidden"
          grid={{ area: "areaImg" }}
          margin={{bottom: '1rem'}}
          url={this._data.background}
        ></i-image>
        <i-hstack grid={{ area: "areaDate" }} verticalAlignment="center" gap="0.5rem" margin={{bottom: '0.5rem'}}>
          <i-panel width={30} height={30} visible={!!this._data.avatar}>
            <i-image width="100%" height="100%" url={this._data.avatar} display="block" class={avatarStyle}></i-image>
          </i-panel>
          <i-vstack verticalAlignment="center" >
            <i-label caption={this.formatDate(this._data.date)} font={{ size: '0.75rem', color: 'rgba(117,124,131,.68)' }}></i-label>
            <i-label caption={this._data.userName} font={{ size: '0.75rem', color: 'rgba(117,124,131,.68)' }}></i-label>
          </i-vstack>
        </i-hstack>
        <i-vstack gap="0.5rem" grid={{ area: "areaDetails" }} verticalAlignment="center">
          <i-label caption={this._data.title} font={{ weight: 600, size: '1.125rem' }}></i-label>
          <i-label caption={this._data.description} font={{ size: '0.875rem' }}></i-label>
          <i-label
            caption="Read More"
            link={{ href: this._data.viewAllUrl, target: "_blank" }}
            font={{ weight: 600, size: '0.75rem', color: Theme.colors.primary.main }}
          ></i-label>
        </i-vstack>
      </i-grid-layout>
    )
  }

  renderOverlay() {
    this.pnlCardBody.clearInnerHTML();
    this.pnlCardBody.appendChild(
      <i-grid-layout
        width="100%"
        height="100%"
        class={cardItemStyle}
        padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
        border={{ radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }}
        gap={{ column: '1rem', row: '1rem' }}
        templateAreas={
          [
            ["areaImg"], ["areaDetails"], ["areaDate"]
          ]
        }
        onClick={() => window.location.href = (this._data.viewAllUrl || '')}
      >
        <i-image
          class={imageStyle}
          width='auto'
          maxHeight={100}
          overflow="hidden"
          grid={{ area: "areaImg" }}
          margin={{bottom: '1rem'}}
          url={this._data.background}
        ></i-image>
        <i-vstack gap="0.5rem" grid={{ area: "areaDetails" }} verticalAlignment="center">
          <i-label caption={this._data.title} font={{ weight: 600, size: '1.25rem' }}></i-label>
          <i-label caption={this._data.description} font={{size: '0.875rem'}}></i-label>
        </i-vstack>
        <i-hstack grid={{ area: "areaDate" }} gap="10px" verticalAlignment="center">
          <i-hstack gap="4px" visible={!!this._data.date} verticalAlignment="center">
            <i-icon name="calendar" width={12} height={12} fill='rgba(117,124,131,.68)'></i-icon>
            <i-label caption={this.formatDate(this._data.date)} font={{ size: '0.75rem', color: 'rgba(117,124,131,.68)' }}></i-label>
          </i-hstack>
          <i-hstack gap="4px" visible={!!this._data.userName} verticalAlignment="center">
            <i-icon name="eye" width={12} height={12} fill='rgba(117,124,131,.68)'></i-icon>
            <i-label caption={this._data.userName} font={{ size: '0.75rem', color: 'rgba(117,124,131,.68)' }}></i-label>
          </i-hstack>
        </i-hstack>
      </i-grid-layout>
    )
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={cardStyle}>
        <i-panel id="pnlCard">
          <i-hstack
            id="pnlCardHeader"
            verticalAlignment='center'
            horizontalAlignment='space-between'
            padding={{ top: '1.5rem', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}
          >
            {/* <i-vstack gap="0.5rem">
              <i-label id="lblTitle" font={{ size: '1.1rem', weight: 600 }}></i-label>
              <i-label id="lblDesc" font={{ size: '0.875rem', color: Theme.colors.secondary.main }}></i-label>
            </i-vstack>
            <i-hstack id="pnlControls" class={controlStyle} gap="0.5rem"></i-hstack> */}
          </i-hstack>
          <i-panel id="pnlCardBody"></i-panel>
          <i-panel id="pnlCardFooter"></i-panel>
        </i-panel>
        <pageblock-blog-config id="cardConfig" visible={false}></pageblock-blog-config>
      </i-panel>
    )
  }
}
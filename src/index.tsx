import {
  Module,
  customModule,
  Styles,
  Panel,
  ControlElement,
  customElements,
  Container
} from '@ijstech/components';
import { IConfig, ISettings } from './interface';
import { cardItemStyle, cardStyle, imageStyle, containerStyle } from './index.css';
import { Model } from './model/index';
import { defaultSettings, formatDate } from './utils';

const Theme = Styles.Theme.ThemeVars;

interface ScomBlogElement extends ControlElement {
  lazyLoad?: boolean;
  data?: IConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-page-blog']: ScomBlogElement;
    }
  }
}

@customModule
@customElements('i-scom-page-blog')
export default class ScomPageBlog extends Module {
  private pnlCard: Panel;
  private model: Model;

  get data () {
    return this.model.data;
  }

  set data (value: IConfig) {
    this.model.data = value;
  }

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
    this.model = new Model({
      onUpdateBlock: this.onUpdateBlock.bind(this),
      onUpdateTheme: this.onUpdateTheme.bind(this)
    });
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const data = this.getAttribute('data', true);
      if (data) this.setData(data);

      this.setTag({
        ...defaultSettings
      });
    }
  }

  private async setData(data: IConfig) {
    await this.model.setData(data);
  }

  private setTag(value: ISettings) {
    this.model.setTag(value);
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  private onUpdateBlock() {
    const {
      backgroundImageUrl = '',
      backgroundImageCid = '',
      avatar,
      date,
      userName,
      title,
      description,
      link,
      isExternal
    } = this.data;

    const {
      titleFontSize,
      descriptionFontSize,
      linkTextSize,
      dateFontSize,
      userNameFontSize,
      boxShadow
    } = this.model.tag;

    let url = backgroundImageUrl || 'https://placehold.co/600x400?text=No+Image';
    if (backgroundImageCid) {
      url = "https://ipfs.scom.dev/ipfs/" + backgroundImageCid;
    }

    this.pnlCard.clearInnerHTML();
    this.pnlCard.appendChild(
      <i-vstack
        width="100%"
        height="100%"
        class={cardItemStyle}
        border={{ radius: 6 }}
        boxShadow={boxShadow || ''}
        overflow="hidden"
        onClick={this.openLink}
      >
        <i-panel
          overflow={"hidden"}
          position="relative"
          width={'100%'}
          padding={{top: '56.25%'}}
        >
          <i-image
            class={imageStyle}
            width='100%'
            height="100%"
            url={url}
            position="absolute"
            left="0px" top="0px"
            objectFit='cover'
          ></i-image>
        </i-panel>
        <i-panel padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }} background={{ color: Theme.background.main }}>
          <i-hstack verticalAlignment="center" gap="0.938rem" margin={{bottom: '0.75rem'}}>
            <i-panel width={50} height={50} visible={!!avatar}>
              <i-image
                width="100%" height="100%"
                url={avatar}
                display="block" objectFit='cover'
                border={{radius: '50%'}}
              ></i-image>
            </i-panel>
            <i-vstack verticalAlignment="center" gap="0.25rem">
              <i-label
                id="dateLb"
                visible={!!date}
                caption={formatDate(date)}
                font={{ size: dateFontSize || '0.8125rem', color: Theme.text.third }}
              ></i-label>
              <i-label
                id="usernameLb"
                visible={!!userName}
                caption={userName}
                font={{ size: userNameFontSize || '0.8125rem', color: Theme.text.disabled}}
              ></i-label>
            </i-vstack>
          </i-hstack>
          <i-vstack verticalAlignment="center" gap="0.5rem" padding={{ bottom: '1rem' }}>
            <i-label
              id="titleLb"
              caption={title || ''}
              font={{ weight: 700, size: titleFontSize || '1.375rem', color: Theme.text.primary }}
            ></i-label>
            <i-label
              id="descriptionLb"
              caption={description || ''}
              font={{ size: descriptionFontSize || '0.875rem', color: Theme.text.secondary }}
            ></i-label>
            <i-label
              id="linkLb"
              caption="Read More"
              link={{ href: link, target: isExternal ? "_blank" :  "_self" }}
              font={{ weight: 700, size: linkTextSize || '0.875rem', color: Theme.text.hint }}  
            ></i-label>
          </i-vstack>
        </i-panel>
      </i-vstack>
    )
  }

  private openLink() {
    if (!this.data?.link) return;
    if (this.data?.isExternal)
      window.open(this.data.link);
    else
      window.location.href = this.data.link;
  }

  private onUpdateTheme() {
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--text-primary', this.model.tag[themeVar]?.titleColor);
    this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
    this.updateStyle('--text-secondary', this.model.tag[themeVar]?.descriptionColor);
    this.updateStyle('--text-third', this.model.tag[themeVar]?.dateColor);
    this.updateStyle('--text-disabled', this.model.tag[themeVar]?.userNameColor);
    this.updateStyle('--text-hint', this.model.tag[themeVar]?.linkColor);
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={cardStyle}>
        <i-panel class={containerStyle}>
          <i-panel id="pnlCard" minHeight={48}></i-panel>
        </i-panel>
      </i-panel>
    )
  }
}
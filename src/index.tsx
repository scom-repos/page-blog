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
import { cardItemStyle, cardStyle, imageStyle } from './index.css';
import { Model } from './model/index';
import { defaultSettings, formatDate } from './utils';
import translation from './translation.json';

const Theme = Styles.Theme.ThemeVars;

interface ScomBlogElement extends ControlElement {
  lazyLoad?: boolean;
  data?: IConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-page-blog']: ScomBlogElement;
    }
  }
}

@customModule
@customElements('i-page-blog', {
  icon: 'stop',
  props: {
    data: {
      type: 'object',
      default: {}
    }
  },
  className: 'ScomPageBlog',
  events: {},
  dataSchema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          backgroundImageCid: {
            type: 'string'
          },
          backgroundImageUrl: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          link: {
            type: 'string'
          },
          linkText: {
            type: 'string'
          },
          date: {
            format: 'date',
            type: 'string'
          },
          userName: {
            type: 'string'
          },
          avatar: {
            type: 'string'
          },
          isExternal: {
            type: 'boolean'
          }
        }
      }
    }
  }
})
export default class ScomPageBlog extends Module {
  private pnlCard: Panel;
  private pnlBlock: Panel;
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
    this.i18n.init(translation);
    super.init();
    this.openLink = this.openLink.bind(this);
    this.model = new Model({
      onUpdateBlock: this.onUpdateBlock.bind(this),
      onUpdateTheme: this.onUpdateTheme.bind(this)
    });
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const data = this.getAttribute('data', true);
      if (data) this.setData(data);
    }

    const tag = this.getAttribute('tag', true);
    if (tag) this.setTag(tag);
    else this.setTag({
      ...defaultSettings
    });
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
      linkText,
      isExternal
    } = this.data;

    const {
      titleFontSize,
      descriptionFontSize,
      linkTextSize,
      dateFontSize,
      userNameFontSize,
      boxShadow,
      borderRadius = 6
    } = this.model.tag;

    let url = backgroundImageUrl || 'https://placehold.co/600x400?text=No+Image';
    if (backgroundImageCid) {
      url = "https://ipfs.scom.dev/ipfs/" + backgroundImageCid;
    }

    if (boxShadow !== undefined) this.pnlBlock.boxShadow = boxShadow;

    this.pnlCard.clearInnerHTML();
    this.pnlCard.appendChild(
      <i-vstack
        width="100%"
        height="100%"
        class={cardItemStyle}
        border={{ radius: borderRadius }}
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
        <i-grid-layout
          padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
          background={{ color: Theme.background.main }}
          stack={{grow: "1"}}
          autoFillInHoles
          templateAreas={avatar ? [['date'], ['title']] : [['title'], ['date']]}
        >
          <i-hstack
            verticalAlignment="center"
            gap="0.938rem"
            margin={{bottom: '0.75rem'}}
            grid={{area: 'date'}}
          >
            <i-panel width={50} height={50} visible={!!avatar}>
              <i-image
                width="100%" height="100%"
                url={avatar}
                display="block" objectFit='cover'
                border={{radius: '50%'}}
              ></i-image>
            </i-panel>
            <i-stack
              gap={avatar ? '0.25rem' : '0.675rem'}
              direction={avatar ? 'vertical' : 'horizontal'}
            >
              <i-hstack
                verticalAlignment="center"
                gap="0.25rem"
              >
                <i-icon
                  stack={{shrink: '0'}}
                  name="calendar"
                  fill={Theme.text.disabled}
                  visible={!avatar}
                  width="0.75rem" height="0.75rem"
                ></i-icon>
                <i-label
                  id="dateLb"
                  visible={!!date}
                  caption={formatDate(date)}
                  font={{ size: dateFontSize || '0.8125rem', color: Theme.text.third }}
                ></i-label>
              </i-hstack>
              <i-hstack
                verticalAlignment="center"
                gap="0.25rem"
              >
                <i-icon
                  stack={{shrink: '0'}}
                  name="eye"
                  fill={Theme.text.disabled}
                  visible={!avatar}
                  width="0.75rem" height="0.75rem"
                ></i-icon>
                <i-label
                  id="usernameLb"
                  visible={!!userName}
                  caption={userName}
                  font={{ size: userNameFontSize || '0.8125rem', color: Theme.text.disabled}}
                ></i-label>
              </i-hstack>
            </i-stack>
          </i-hstack>
          <i-vstack
            verticalAlignment="center"
            gap="0.5rem"
            padding={{ bottom: '1rem' }}
            stack={{grow: "1"}}
            justifyContent='space-around'
            grid={{area: 'title'}}
          >
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
              visible={!!linkText}
              caption="$read_more"
              link={{ href: link, target: isExternal ? "_blank" :  "_self" }}
              font={{ weight: 700, size: linkTextSize || '0.875rem', color: Theme.text.hint }}
            ></i-label>
          </i-vstack>
        </i-grid-layout>
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
      <i-panel id="pnlBlock" class={cardStyle} height="100%">
        <i-panel id="pnlCard" minHeight={48} height="100%"></i-panel>
      </i-panel>
    )
  }
}
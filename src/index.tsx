import {
  Module,
  customModule,
  Styles,
  Panel,
  ControlElement,
  customElements,
  Container
} from '@ijstech/components';
import { IBlogItem, IBlogSettings } from './interface';
import { cardItemStyle, cardStyle, imageStyle } from './index.css';
import { Model } from './model/index';
import { defaultSettings, formatDate, merge } from './utils';
import translation from './translation.json';

const Theme = Styles.Theme.ThemeVars;

export { IBlogItem, IBlogSettings };

interface ScomBlogElement extends ControlElement {
  lazyLoad?: boolean;
  data?: IBlogItem;
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
  events: {}
})
export default class ScomPageBlog extends Module {
  private pnlCard: Panel;
  private pnlBlock: Panel;
  private model: Model;

  get data () {
    return this.model.data;
  }

  set data (value: IBlogItem) {
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
  }

  private async setData(data: IBlogItem) {
    await this.model.setData(data);
  }

  private setTag(value: IBlogSettings) {
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

    const mergedTag = merge(defaultSettings, this.model.tag);
    const {
      boxShadow,
      padding = { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' },
      border = { radius: 6 },
      title: titleStyles,
      description: descriptionStyles,
      date: dateStyles,
      userName: userNameStyles,
      link: linkStyles
    } = mergedTag;

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
        border={border}
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
          padding={padding}
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
                  visible={!avatar && !!date}
                  width="0.75rem" height="0.75rem"
                ></i-icon>
                <i-label
                  id="dateLb"
                  visible={!!date}
                  caption={formatDate(date)}
                  font={dateStyles?.font}
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
                  visible={!avatar && !!userName}
                  width="0.75rem" height="0.75rem"
                ></i-icon>
                <i-label
                  id="usernameLb"
                  visible={!!userName}
                  caption={userName}
                  font={userNameStyles?.font}
                ></i-label>
              </i-hstack>
            </i-stack>
          </i-hstack>
          <i-vstack
            gap="0.5rem"
            padding={{ bottom: '1rem' }}
            stack={{grow: "1"}}
            justifyContent='space-between'
            grid={{area: 'title'}}
          >
            <i-label
              id="titleLb"
              caption={title || ''}
              font={titleStyles?.font}
            ></i-label>
            <i-label
              id="descriptionLb"
              caption={description || ''}
              font={descriptionStyles?.font}
            ></i-label>
            <i-label
              id="linkLb"
              visible={!!link?.caption}
              caption={link?.caption || '$read_more'}
              link={{ href: link?.url, target: isExternal ? "_blank" :  "_self" }}
              font={linkStyles?.font}
            ></i-label>
          </i-vstack>
        </i-grid-layout>
      </i-vstack>
    )
  }

  private openLink() {
    if (!this.data?.link?.url || this._designMode) return;
    if (this.data?.isExternal)
      window.open(this.data.link.url);
    else
      window.location.href = this.data.link.url;
  }

  private onUpdateTheme() {
    this.updateStyle('--text-primary', this.model.tag?.title?.font?.color);
    this.updateStyle('--background-main', this.model.tag?.background?.color);
    this.updateStyle('--text-secondary', this.model.tag?.description?.font?.color);
    this.updateStyle('--text-third', this.model.tag?.date?.font?.color);
    this.updateStyle('--text-disabled', this.model.tag?.userName?.font?.color);
    this.updateStyle('--text-hint', this.model.tag?.link?.font?.color);
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
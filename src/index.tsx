import {
  Module,
  customModule,
  Styles,
  Panel,
  ControlElement,
  customElements,
  Container,
  Label
} from '@ijstech/components';
import { IBlogItem, IBlogSettings } from './interface';
import { cardItemStyle, cardStyle, getCustomButtonStyle, imageStyle } from './index.css';
import { Model } from './model/index';
import { defaultSettings, formatDate, merge } from './utils';
import translation from './translation.json';

const Theme = Styles.Theme.ThemeVars;

export { IBlogItem, IBlogSettings };

interface ScomBlogElement extends ControlElement {
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
  private titleLb: Label;

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
      onUpdateBlock: this.onUpdateBlock.bind(this)
    });

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.tag = tag;
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
  }

  private async setData(data: IBlogItem) {
    await this.model.setData(data);
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
      isOverlay
    } = this.data;

    const mergedTag = this.model.tag ? merge(defaultSettings, this.model.tag) : defaultSettings;
    const {
      boxShadow,
      padding = { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' },
      border = { radius: 6 },
      background = { color: Theme.background.main },
      height,
      gap = 0,
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
    if (height !== undefined) this.height = height;

    this.pnlCard.clearInnerHTML();
    this.pnlCard.appendChild(
      <i-vstack
        width="100%"
        height="100%"
        class={cardItemStyle}
        border={border}
        gap={gap}
        overflow="hidden"
        onClick={this.openLink}
      >
        <i-panel
          overflow={"hidden"}
          position="relative"
          width={'100%'}
          padding={{top: '56.25%'}}
          height={isOverlay ? '100%' : 'auto'}
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
          background={background}
          stack={{grow: "1"}}
          autoFillInHoles
          templateAreas={avatar ? [['date'], ['title']] : (!!date || !!userName) ? [['title'], ['date']] : [['title']]}
          position={isOverlay ? 'absolute' : 'initial'}
          left={isOverlay ? '1px' : 'initial'}
          bottom={isOverlay ? '0px' : 'initial'}
          maxHeight={isOverlay ? '50%' : '100%'}
          width="100%"
        >
          <i-hstack
            verticalAlignment="center"
            gap="0.938rem"
            margin={{bottom: '0.75rem'}}
            grid={{area: 'date'}}
            visible={!!date || !!userName}
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
                  fill={dateStyles?.font?.color}
                  visible={!avatar && !!date}
                  width="0.75rem" height="0.75rem"
                ></i-icon>
                <i-label
                  id="dateLb"
                  visible={!!date}
                  caption={formatDate(date)}
                  font={dateStyles?.font}
                  opacity={dateStyles?.opacity ?? 1}
                ></i-label>
              </i-hstack>
              <i-hstack
                verticalAlignment="center"
                gap="0.25rem"
              >
                <i-icon
                  stack={{shrink: '0'}}
                  name="eye"
                  fill={userNameStyles?.font?.color}
                  visible={!avatar && !!userName}
                  width="0.75rem" height="0.75rem"
                ></i-icon>
                <i-label
                  id="usernameLb"
                  visible={!!userName}
                  caption={userName}
                  font={userNameStyles?.font}
                  opacity={userNameStyles?.opacity ?? 1}
                ></i-label>
              </i-hstack>
            </i-stack>
          </i-hstack>
          <i-vstack
            gap="0.5rem"
            stack={{grow: "1"}}
            justifyContent='space-between'
            grid={{area: 'title'}}
          >
            <i-label
              id="titleLb"
              caption={title || ''}
              font={titleStyles?.font}
              visible={!!title}
              width="100%"
            ></i-label>
            <i-label
              id="descriptionLb"
              caption={description || ''}
              font={descriptionStyles?.font}
              visible={!!description}
            ></i-label>
            <i-hstack>
              <i-button
                id="linkLb"
                visible={!!link?.caption}
                caption={link?.caption || '$read_more'}
                onClick={this.openLink}
                font={linkStyles?.font}
                background={linkStyles?.background}
                padding={linkStyles?.padding}
                margin={linkStyles?.margin}
                boxShadow='none'
                class={getCustomButtonStyle(linkStyles?.background?.color, linkStyles?.font?.color)}
              ></i-button>
            </i-hstack>
          </i-vstack>
        </i-grid-layout>
      </i-vstack>
    )

    if (titleStyles?.lineClamp) {
      this.titleLb.lineClamp = titleStyles?.lineClamp;
    }
  }

  private openLink() {
    if (!this.data?.link?.url || this._designMode) return;
    const href = this.data.link.url;
    const parentSite = this.closest('i-decom-site');
    
    if (this.data?.isExternal || (href.startsWith('http://') || href.startsWith('https://')))
      window.open(this.data.link.url);
    else {
      if (parentSite) {
        window.history.pushState('', '', `${href}`);
        window.dispatchEvent(new Event('popstate'));
      }
      else {
        window.location.href = href;
      }
    }
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={cardStyle} height="100%">
        <i-panel id="pnlCard" minHeight={48} height="100%"></i-panel>
      </i-panel>
    )
  }
}
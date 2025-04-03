var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-blog/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-blog/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.containerStyle = exports.controlStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.cardStyle = components_1.Styles.style({
        $nest: {
            'i-link > a': {
                textDecoration: 'none'
            }
        }
    });
    exports.cardItemStyle = components_1.Styles.style({
        cursor: 'pointer',
        $nest: {
            '&:hover i-button': {
                background: Theme.colors.primary.dark,
                color: Theme.colors.primary.contrastText
            },
            '&:hover i-button > i-icon': {
                fill: '#fff !important'
            }
        }
    });
    exports.imageStyle = components_1.Styles.style({
        $nest: {
            '> img': {
                objectPosition: 'center'
            }
        }
    });
    exports.controlStyle = components_1.Styles.style({
        $nest: {
            'i-button': {
                boxShadow: 'none',
            },
            'i-button > span': {
                display: 'none'
            },
            'i-button:not(.disabled):hover': {
                background: 'transparent',
                boxShadow: 'none',
                borderColor: 'rgba(117,124,131,.68)',
                $nest: {
                    '> i-icon': {
                        fill: 'rgba(117,124,131,.68) !important'
                    }
                }
            }
        }
    });
    exports.containerStyle = components_1.Styles.style({
        width: Theme.layout.container.width,
        maxWidth: Theme.layout.container.maxWidth,
        overflow: Theme.layout.container.overflow,
        textAlign: Theme.layout.container.textAlign,
        margin: '0 auto'
    });
});
define("@scom/page-blog/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._data = {
                title: '',
                backgroundImageUrl: '',
                backgroundImageCid: ''
            };
            this._tag = {
                light: {},
                dark: {}
            };
            this._options = options;
        }
        get tag() {
            return this._tag;
        }
        set tag(value) {
            this._tag = value;
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        async setData(data) {
            this._data = data;
            this._options?.onUpdateBlock();
        }
        getData() {
            return this._data;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._tag[type] = this._tag[type] || {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._tag[type][prop] = value[prop];
            }
        }
        getTag() {
            return this._tag;
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        await this.setData({ ...data });
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/page-blog/utils.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultSettings = exports.merge = exports.formatDate = void 0;
    const Theme = components_2.Styles.Theme.currentTheme;
    const formatDate = (date) => {
        if (!date)
            return '';
        const currentLg = components_2.application.locale;
        const locale = currentLg.startsWith('zh') ? 'zh-hk' : currentLg;
        if (locale !== components_2.moment.locale())
            components_2.moment.locale(locale);
        return (0, components_2.moment)(date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
    };
    exports.formatDate = formatDate;
    const merge = (...objects) => {
        return objects.reduce((prev, obj) => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof prev[key] === 'object')
                        prev[key] = merge(prev[key], obj[key]);
                    else
                        prev[key] = obj[key];
                }
            }
            return prev;
        }, {});
    };
    exports.merge = merge;
    const defaultSettings = {
        date: {
            font: { size: '0.8125rem', color: Theme.text.third }
        },
        userName: {
            font: { size: '0.8125rem', color: Theme.text.disabled }
        },
        title: {
            font: { weight: 700, size: '1.375rem', color: Theme.text.primary }
        },
        description: {
            font: { size: '0.875rem', color: Theme.text.secondary }
        },
        link: {
            font: { weight: 700, size: '0.875rem', color: Theme.text.hint }
        }
    };
    exports.defaultSettings = defaultSettings;
});
define("@scom/page-blog/translation.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/page-blog/translation.json.ts'/> 
    exports.default = {
        "en": {
            "read_more": "Read More"
        },
        "zh-hant": {
            "read_more": "閱讀更多"
        },
        "vi": {
            "read_more": "Xem thêm"
        }
    };
});
define("@scom/page-blog", ["require", "exports", "@ijstech/components", "@scom/page-blog/index.css.ts", "@scom/page-blog/model/index.ts", "@scom/page-blog/utils.ts", "@scom/page-blog/translation.json.ts"], function (require, exports, components_3, index_css_1, index_1, utils_1, translation_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomPageBlog = class ScomPageBlog extends components_3.Module {
        get data() {
            return this.model.data;
        }
        set data(value) {
            this.model.data = value;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        init() {
            this.i18n.init(translation_json_1.default);
            super.init();
            this.openLink = this.openLink.bind(this);
            this.model = new index_1.Model({
                onUpdateBlock: this.onUpdateBlock.bind(this),
                onUpdateTheme: this.onUpdateTheme.bind(this)
            });
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data)
                    this.setData(data);
            }
            const tag = this.getAttribute('tag', true);
            if (tag)
                this.setTag(tag);
        }
        async setData(data) {
            await this.model.setData(data);
        }
        setTag(value) {
            this.model.setTag(value);
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        onUpdateBlock() {
            const { backgroundImageUrl = '', backgroundImageCid = '', avatar, date, userName, title, description, link, isExternal } = this.data;
            const mergedTag = (0, utils_1.merge)(utils_1.defaultSettings, this.model.tag);
            const { boxShadow, border = { radius: 6 }, title: titleStyles, description: descriptionStyles, date: dateStyles, userName: userNameStyles, link: linkStyles } = mergedTag;
            let url = backgroundImageUrl || 'https://placehold.co/600x400?text=No+Image';
            if (backgroundImageCid) {
                url = "https://ipfs.scom.dev/ipfs/" + backgroundImageCid;
            }
            if (boxShadow !== undefined)
                this.pnlBlock.boxShadow = boxShadow;
            this.pnlCard.clearInnerHTML();
            this.pnlCard.appendChild(this.$render("i-vstack", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, border: border, overflow: "hidden", onClick: this.openLink },
                this.$render("i-panel", { overflow: "hidden", position: "relative", width: '100%', padding: { top: '56.25%' } },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", url: url, position: "absolute", left: "0px", top: "0px", objectFit: 'cover' })),
                this.$render("i-grid-layout", { padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, background: { color: Theme.background.main }, stack: { grow: "1" }, autoFillInHoles: true, templateAreas: avatar ? [['date'], ['title']] : [['title'], ['date']] },
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "0.938rem", margin: { bottom: '0.75rem' }, grid: { area: 'date' } },
                        this.$render("i-panel", { width: 50, height: 50, visible: !!avatar },
                            this.$render("i-image", { width: "100%", height: "100%", url: avatar, display: "block", objectFit: 'cover', border: { radius: '50%' } })),
                        this.$render("i-stack", { gap: avatar ? '0.25rem' : '0.675rem', direction: avatar ? 'vertical' : 'horizontal' },
                            this.$render("i-hstack", { verticalAlignment: "center", gap: "0.25rem" },
                                this.$render("i-icon", { stack: { shrink: '0' }, name: "calendar", fill: Theme.text.disabled, visible: !avatar, width: "0.75rem", height: "0.75rem" }),
                                this.$render("i-label", { id: "dateLb", visible: !!date, caption: (0, utils_1.formatDate)(date), font: dateStyles?.font })),
                            this.$render("i-hstack", { verticalAlignment: "center", gap: "0.25rem" },
                                this.$render("i-icon", { stack: { shrink: '0' }, name: "eye", fill: Theme.text.disabled, visible: !avatar, width: "0.75rem", height: "0.75rem" }),
                                this.$render("i-label", { id: "usernameLb", visible: !!userName, caption: userName, font: userNameStyles?.font })))),
                    this.$render("i-vstack", { gap: "0.5rem", padding: { bottom: '1rem' }, stack: { grow: "1" }, justifyContent: 'space-between', grid: { area: 'title' } },
                        this.$render("i-label", { id: "titleLb", caption: title || '', font: titleStyles?.font }),
                        this.$render("i-label", { id: "descriptionLb", caption: description || '', font: descriptionStyles?.font }),
                        this.$render("i-label", { id: "linkLb", visible: !!link?.caption, caption: "$read_more", link: { href: link.url, target: isExternal ? "_blank" : "_self" }, font: linkStyles?.font })))));
        }
        openLink() {
            if (!this.data?.link?.url || this._designMode)
                return;
            if (this.data?.isExternal)
                window.open(this.data.link.url);
            else
                window.location.href = this.data.link.url;
        }
        onUpdateTheme() {
            this.updateStyle('--text-primary', this.model.tag?.title?.font?.color);
            this.updateStyle('--background-main', this.model.tag?.background?.color);
            this.updateStyle('--text-secondary', this.model.tag?.description?.font?.color);
            this.updateStyle('--text-third', this.model.tag?.date?.font?.color);
            this.updateStyle('--text-disabled', this.model.tag?.userName?.font?.color);
            this.updateStyle('--text-hint', this.model.tag?.link?.font?.color);
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.cardStyle, height: "100%" },
                this.$render("i-panel", { id: "pnlCard", minHeight: 48, height: "100%" })));
        }
    };
    ScomPageBlog = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-page-blog', {
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
    ], ScomPageBlog);
    exports.default = ScomPageBlog;
});

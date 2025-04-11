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
    exports.getCustomButtonStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
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
    const getCustomButtonStyle = (background, color) => {
        return components_1.Styles.style({
            $nest: {
                '&:hover': {
                    background: background,
                    color: color
                }
            }
        });
    };
    exports.getCustomButtonStyle = getCustomButtonStyle;
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
            font: { weight: 700, size: '0.875rem', color: Theme.text.hint },
            padding: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
            margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
            background: { color: 'transparent !important' }
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
                onUpdateBlock: this.onUpdateBlock.bind(this)
            });
            const tag = this.getAttribute('tag', true);
            if (tag)
                this.model.tag = tag;
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
        }
        async setData(data) {
            await this.model.setData(data);
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        onUpdateBlock() {
            const { backgroundImageUrl = '', backgroundImageCid = '', avatar, date, userName, title, description, link, isOverlay } = this.data;
            const mergedTag = this.model.tag ? (0, utils_1.merge)(utils_1.defaultSettings, this.model.tag) : utils_1.defaultSettings;
            const { boxShadow, padding = { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, border = { radius: 6 }, background = { color: Theme.background.main }, height, gap = 0, title: titleStyles, description: descriptionStyles, date: dateStyles, userName: userNameStyles, link: linkStyles } = mergedTag;
            let url = backgroundImageUrl || 'https://placehold.co/600x400?text=No+Image';
            if (backgroundImageCid) {
                url = "https://ipfs.scom.dev/ipfs/" + backgroundImageCid;
            }
            if (boxShadow !== undefined)
                this.pnlBlock.boxShadow = boxShadow;
            if (height !== undefined)
                this.height = height;
            this.pnlCard.clearInnerHTML();
            this.pnlCard.appendChild(this.$render("i-vstack", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, border: border, gap: gap, overflow: "hidden", onClick: this.openLink },
                this.$render("i-panel", { overflow: "hidden", position: "relative", width: '100%', padding: { top: '56.25%' }, height: isOverlay ? '100%' : 'auto' },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", url: url, position: "absolute", left: "0px", top: "0px", objectFit: 'cover' })),
                this.$render("i-grid-layout", { padding: padding, background: background, stack: { grow: "1" }, autoFillInHoles: true, templateAreas: avatar ? [['date'], ['title']] : (!!date || !!userName) ? [['title'], ['date']] : [['title']], position: isOverlay ? 'absolute' : 'initial', left: isOverlay ? '1px' : 'initial', bottom: isOverlay ? '0px' : 'initial', maxHeight: isOverlay ? '50%' : '100%', width: "100%" },
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "0.938rem", margin: { bottom: '0.75rem' }, grid: { area: 'date' }, visible: !!date || !!userName },
                        this.$render("i-panel", { width: 50, height: 50, visible: !!avatar },
                            this.$render("i-image", { width: "100%", height: "100%", url: avatar, display: "block", objectFit: 'cover', border: { radius: '50%' } })),
                        this.$render("i-stack", { gap: avatar ? '0.25rem' : '0.675rem', direction: avatar ? 'vertical' : 'horizontal' },
                            this.$render("i-hstack", { verticalAlignment: "center", gap: "0.25rem" },
                                this.$render("i-icon", { stack: { shrink: '0' }, name: "calendar", fill: dateStyles?.font?.color, visible: !avatar && !!date, width: "0.75rem", height: "0.75rem" }),
                                this.$render("i-label", { id: "dateLb", visible: !!date, caption: (0, utils_1.formatDate)(date), font: dateStyles?.font, opacity: dateStyles?.opacity ?? 1 })),
                            this.$render("i-hstack", { verticalAlignment: "center", gap: "0.25rem" },
                                this.$render("i-icon", { stack: { shrink: '0' }, name: "eye", fill: userNameStyles?.font?.color, visible: !avatar && !!userName, width: "0.75rem", height: "0.75rem" }),
                                this.$render("i-label", { id: "usernameLb", visible: !!userName, caption: userName, font: userNameStyles?.font, opacity: userNameStyles?.opacity ?? 1 })))),
                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: "1" }, justifyContent: 'space-between', grid: { area: 'title' } },
                        this.$render("i-label", { id: "titleLb", caption: title || '', font: titleStyles?.font, visible: !!title, width: "100%" }),
                        this.$render("i-label", { id: "descriptionLb", caption: description || '', font: descriptionStyles?.font, visible: !!description }),
                        this.$render("i-hstack", null,
                            this.$render("i-button", { id: "linkLb", visible: !!link?.caption, caption: link?.caption || '$read_more', onClick: this.openLink, font: linkStyles?.font, background: linkStyles?.background, padding: linkStyles?.padding, margin: linkStyles?.margin, boxShadow: 'none', class: (0, index_css_1.getCustomButtonStyle)(linkStyles?.background?.color, linkStyles?.font?.color) }))))));
            if (titleStyles?.lineClamp) {
                this.titleLb.lineClamp = titleStyles?.lineClamp;
            }
        }
        openLink() {
            if (!this.data?.link?.url || this._designMode)
                return;
            if (this.data?.isExternal)
                window.open(this.data.link.url);
            else
                window.location.href = this.data.link.url;
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

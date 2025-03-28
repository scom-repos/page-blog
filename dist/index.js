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
define("@scom/page-blog/model/formSchema.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.themeSchema = exports.propertiesUISchema = exports.propertiesSchema = void 0;
    const propertiesSchema = {
        type: 'object',
        properties: {
            title: {
                type: 'string'
            },
            titleFontColor: {
                type: 'string',
                format: 'color',
            },
            description: {
                type: 'string'
            },
            descriptionFontColor: {
                type: 'string',
                format: 'color',
            },
            linkUrl: {
                type: 'string'
            },
            linkTextColor: {
                type: 'string',
                format: 'color',
            },
            isExternal: {
                type: 'boolean'
            },
            date: {
                type: 'string',
                format: 'date'
            },
            dateColor: {
                type: 'string',
                format: 'color',
            },
            backgroundImageCid: {
                title: 'Background Image',
                type: 'string',
                format: 'data-cid'
            },
            backgroundImageUrl: {
                title: 'Url',
                type: 'string'
            },
            userName: {
                type: 'string'
            },
            userNameColor: {
                type: 'string',
                format: 'color',
            },
            avatar: {
                type: 'string'
            },
            backgroundColor: {
                type: 'string',
                format: 'color',
            }
        }
    };
    exports.propertiesSchema = propertiesSchema;
    const propertiesUISchema = {
        type: "VerticalLayout",
        elements: [
            {
                type: "HorizontalLayout",
                elements: [
                    {
                        type: "Categorization",
                        elements: [
                            {
                                type: "Category",
                                label: "General settings",
                                elements: [
                                    {
                                        type: "VerticalLayout",
                                        elements: [
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/title",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/description",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/linkUrl",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/isExternal",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/date",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/backgroundImageCid",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/backgroundImageUrl",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/userName",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/avatar",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "Category",
                                label: "Theme settings",
                                elements: [
                                    {
                                        type: "VerticalLayout",
                                        elements: [
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/titleFontColor",
                                                    },
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/descriptionFontColor",
                                                    },
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/linkTextColor",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "HorizontalLayout",
                                                elements: [
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/dateColor",
                                                    },
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/userNameColor",
                                                    },
                                                    {
                                                        type: "Control",
                                                        scope: "#/properties/backgroundColor",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
    exports.propertiesUISchema = propertiesUISchema;
    const themeSchema = {
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
    exports.themeSchema = themeSchema;
});
define("@scom/page-blog/model/index.ts", ["require", "exports", "@scom/page-blog/model/formSchema.ts"], function (require, exports, formSchema_1) {
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
                    getActions: () => {
                        return this._getActions(formSchema_1.propertiesSchema, formSchema_1.themeSchema);
                    },
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
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let _oldData = {
                            title: '',
                            backgroundImageUrl: '',
                            backgroundImageCid: ''
                        };
                        let _oldTag = {};
                        const [generalSettings, themeSettings] = userInputData;
                        return {
                            execute: async () => {
                                _oldData = { ...this._data };
                                if (builder?.setData)
                                    builder.setData(generalSettings);
                                this.setData(generalSettings);
                                if (themeSettings) {
                                    _oldTag = { ...this._tag };
                                    if (builder)
                                        builder.setTag(themeSettings);
                                    else
                                        this.setTag(themeSettings);
                                }
                            },
                            undo: () => {
                                this._data = { ..._oldData };
                                if (builder?.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                                if (themeSettings) {
                                    this._tag = { ..._oldTag };
                                    if (builder)
                                        builder.setTag(this._tag);
                                    else
                                        this.setTag(this._tag);
                                }
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: formSchema_1.propertiesUISchema
                }
            ];
            return actions;
        }
    }
    exports.Model = Model;
});
define("@scom/page-blog/utils.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultSettings = exports.formatDate = void 0;
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
    const defaultColors = {
        dateColor: '#565656',
        userNameColor: '#565656'
    };
    const colors = {
        titleColor: defaultColors.dateColor,
        descriptionColor: defaultColors.dateColor,
        linkColor: Theme.colors.primary.main,
        dateColor: defaultColors.dateColor,
        userNameColor: defaultColors.userNameColor,
        backgroundColor: Theme.background.main
    };
    const defaultSettings = {
        light: {
            ...colors
        },
        dark: {
            ...colors
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
            "read_more": "阅读更多"
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
            this.i18n.init({ ...translation_json_1.default });
            super.init();
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
            else
                this.setTag({
                    ...utils_1.defaultSettings
                });
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
            const { titleFontSize, descriptionFontSize, linkTextSize, dateFontSize, userNameFontSize, boxShadow, borderRadius = 6 } = this.model.tag;
            let url = backgroundImageUrl || 'https://placehold.co/600x400?text=No+Image';
            if (backgroundImageCid) {
                url = "https://ipfs.scom.dev/ipfs/" + backgroundImageCid;
            }
            if (boxShadow !== undefined)
                this.pnlBlock.boxShadow = boxShadow;
            this.pnlCard.clearInnerHTML();
            this.pnlCard.appendChild(this.$render("i-vstack", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, border: { radius: borderRadius }, overflow: "hidden", onClick: this.openLink },
                this.$render("i-panel", { overflow: "hidden", position: "relative", width: '100%', padding: { top: '56.25%' } },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", url: url, position: "absolute", left: "0px", top: "0px", objectFit: 'cover' })),
                this.$render("i-vstack", { padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, background: { color: Theme.background.main }, stack: { grow: "1" } },
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "0.938rem", margin: { bottom: '0.75rem' } },
                        this.$render("i-panel", { width: 50, height: 50, visible: !!avatar },
                            this.$render("i-image", { width: "100%", height: "100%", url: avatar, display: "block", objectFit: 'cover', border: { radius: '50%' } })),
                        this.$render("i-vstack", { verticalAlignment: "center", gap: "0.25rem" },
                            this.$render("i-label", { id: "dateLb", visible: !!date, caption: (0, utils_1.formatDate)(date), font: { size: dateFontSize || '0.8125rem', color: Theme.text.third } }),
                            this.$render("i-label", { id: "usernameLb", visible: !!userName, caption: userName, font: { size: userNameFontSize || '0.8125rem', color: Theme.text.disabled } }))),
                    this.$render("i-vstack", { verticalAlignment: "center", gap: "0.5rem", padding: { bottom: '1rem' }, stack: { grow: "1" }, justifyContent: 'space-around' },
                        this.$render("i-label", { id: "titleLb", caption: title || '', font: { weight: 700, size: titleFontSize || '1.375rem', color: Theme.text.primary } }),
                        this.$render("i-label", { id: "descriptionLb", caption: description || '', font: { size: descriptionFontSize || '0.875rem', color: Theme.text.secondary } }),
                        this.$render("i-label", { id: "linkLb", caption: "$read_more", link: { href: link, target: isExternal ? "_blank" : "_self" }, font: { weight: 700, size: linkTextSize || '0.875rem', color: Theme.text.hint } })))));
        }
        openLink() {
            if (!this.data?.link)
                return;
            if (this.data?.isExternal)
                window.open(this.data.link);
            else
                window.location.href = this.data.link;
        }
        onUpdateTheme() {
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            this.updateStyle('--text-primary', this.model.tag[themeVar]?.titleColor);
            this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
            this.updateStyle('--text-secondary', this.model.tag[themeVar]?.descriptionColor);
            this.updateStyle('--text-third', this.model.tag[themeVar]?.dateColor);
            this.updateStyle('--text-disabled', this.model.tag[themeVar]?.userNameColor);
            this.updateStyle('--text-hint', this.model.tag[themeVar]?.linkColor);
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
    ], ScomPageBlog);
    exports.default = ScomPageBlog;
});

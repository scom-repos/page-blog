var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("@scom/scom-blog/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-blog/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.containerStyle = exports.controlStyle = exports.avatarStyle = exports.imageOverlayStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
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
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
            }
        }
    });
    exports.imageOverlayStyle = components_1.Styles.style({
        $nest: {
            '> img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
            }
        }
    });
    exports.avatarStyle = components_1.Styles.style({
        $nest: {
            '> img': {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover'
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
define("@scom/scom-blog/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-blog/data.json.ts'/> 
    exports.default = {
    // "defaultBuilderData": {
    //   title: 'Blog title',
    //   description: 'Blog descripion',
    //   backgroundImage: 'https://images.unsplash.com/photo-1637592036032-0a16278cc590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    // }
    };
});
define("@scom/scom-blog", ["require", "exports", "@ijstech/components", "@scom/scom-blog/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.currentTheme;
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
                                                        scope: "#/properties/backgroundImage",
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
    };
    const defaultColors = {
        dateColor: '#565656',
        userNameColor: '#565656',
        backgroundColor: '#fff'
    };
    let Blog = class Blog extends components_2.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                title: '',
                backgroundImageUrl: '',
                backgroundImageCid: ''
            };
            this.tag = {};
            this.defaultEdit = true;
        }
        init() {
            super.init();
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    const [generalSettings] = this.splitData(data);
                    if (generalSettings)
                        this.setData(generalSettings);
                }
                this.setTag({
                    titleFontColor: defaultColors.dateColor,
                    descriptionFontColor: defaultColors.dateColor,
                    linkTextColor: Theme.colors.primary.main,
                    dateColor: defaultColors.dateColor,
                    userNameColor: defaultColors.userNameColor,
                    backgroundColor: defaultColors.backgroundColor
                });
            }
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.onUpdateBlock(this.tag);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.onUpdateBlock(this.tag);
        }
        splitData(userInputData) {
            const { titleFontColor = defaultColors.dateColor, descriptionFontColor = defaultColors.dateColor, linkTextColor = Theme.colors.primary.main, dateColor = defaultColors.dateColor, userNameColor = defaultColors.userNameColor, backgroundColor = defaultColors.backgroundColor } = userInputData, generalSettings = __rest(userInputData, ["titleFontColor", "descriptionFontColor", "linkTextColor", "dateColor", "userNameColor", "backgroundColor"]);
            const themeSettings = {
                titleFontColor,
                descriptionFontColor,
                linkTextColor,
                dateColor,
                userNameColor,
                backgroundColor
            };
            return [generalSettings, themeSettings];
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = {
                            title: '',
                            backgroundImageUrl: '',
                            backgroundImageCid: ''
                        };
                        let _oldTag = {};
                        const [generalSettings, themeSettings] = this.splitData(userInputData);
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(generalSettings);
                                this.setData(generalSettings);
                                if (themeSettings) {
                                    _oldTag = Object.assign({}, this.tag);
                                    if (builder)
                                        builder.setTag(themeSettings);
                                    else
                                        this.setTag(themeSettings);
                                }
                            },
                            undo: () => {
                                this._data = Object.assign({}, _oldData);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                                if (themeSettings) {
                                    this.tag = Object.assign({}, _oldTag);
                                    if (builder)
                                        builder.setTag(this.tag);
                                    else
                                        this.setTag(this.tag);
                                }
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: propertiesUISchema
                }
                // {
                //   name: 'Theme Settings',
                //   icon: 'palette',
                //   command: (builder: any, userInputData: any) => {
                //     let oldTag = {};
                //     return {
                //       execute: async () => {
                //         if (!userInputData) return;
                //         oldTag = {...this.tag};
                //         if (builder) builder.setTag(userInputData);
                //         else this.setTag(userInputData);
                //       },
                //       undo: () => {
                //         if (!userInputData) return;
                //         this.tag = {...oldTag};
                //         if (builder) builder.setTag(this.tag);
                //         else this.setTag(this.tag);
                //       },
                //       redo: () => { }
                //     }
                //   },
                //   userInputDataSchema: themeSchema
                // }
            ];
            return actions;
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
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
                        return this._getActions(propertiesSchema, themeSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        // const defaultData = dataJson.defaultBuilderData as any;
                        // await this.setData({...defaultData, ...data})
                        await this.setData(Object.assign({}, data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                    splitData: this.splitData.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                    splitData: this.splitData.bind(this)
                }
            ];
        }
        onUpdateBlock(config) {
            const { titleFontColor = defaultColors.dateColor, descriptionFontColor = defaultColors.dateColor, linkTextColor = Theme.colors.primary.main, dateColor = defaultColors.dateColor, userNameColor = defaultColors.userNameColor, backgroundColor = defaultColors.backgroundColor } = config || {};
            let url = this._data.backgroundImageUrl || 'https://placehold.co/600x400?text=No+Image';
            if (this._data.backgroundImageCid) {
                url = "https://ipfs.scom.dev/ipfs/" + this._data.backgroundImageCid;
            }
            this.pnlCardBody.clearInnerHTML();
            this.pnlCardBody.appendChild(this.$render("i-grid-layout", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, border: { radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, templateAreas: [
                    ["areaImg"], ["areaDate"], ["areaDetails"]
                ], overflow: "hidden", onClick: () => this.openLink() },
                this.$render("i-panel", { overflow: { x: 'hidden', y: 'hidden' }, position: "relative", padding: { top: '56.25%' } },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", grid: { area: "areaImg" }, url: url, position: "absolute", left: "0px", top: "0px" })),
                this.$render("i-panel", { padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, background: { color: backgroundColor || defaultColors.backgroundColor } },
                    this.$render("i-hstack", { grid: { area: "areaDate" }, verticalAlignment: "center", gap: "0.938rem", margin: { bottom: '0.75rem' } },
                        this.$render("i-panel", { width: 50, height: 50, visible: !!this._data.avatar },
                            this.$render("i-image", { width: "100%", height: "100%", url: this._data.avatar, display: "block", class: index_css_1.avatarStyle })),
                        this.$render("i-vstack", { verticalAlignment: "center", gap: "0.25rem" },
                            this.$render("i-label", { id: "dateLb", visible: !!this._data.date, caption: this.formatDate(this._data.date), font: { size: '0.8125rem', color: dateColor || defaultColors.dateColor } }),
                            this.$render("i-label", { id: "usernameLb", visible: !!this._data.userName, caption: this._data.userName, font: { size: '0.8125rem', color: userNameColor || defaultColors.userNameColor } }))),
                    this.$render("i-vstack", { grid: { area: "areaDetails" }, verticalAlignment: "center", gap: "0.5rem", padding: { bottom: '1rem' } },
                        this.$render("i-label", { id: "titleLb", caption: this._data.title || '', font: { weight: 700, size: '1.375rem', color: titleFontColor || defaultColors.dateColor } }),
                        this.$render("i-label", { id: "descriptionLb", caption: this._data.description || '', font: { size: '0.875rem', color: descriptionFontColor || defaultColors.dateColor } }),
                        this.$render("i-label", { id: "linkLb", caption: "Read More", link: { href: this._data.linkUrl, target: this._data.isExternal ? "_blank" : "_self" }, font: { weight: 700, size: '0.875rem', color: linkTextColor || defaultColors.dateColor } })))));
        }
        formatDate(date) {
            if (!date)
                return '';
            return (0, components_2.moment)(date, "DD/MM/YYYY").format('MMMM DD, YYYY');
        }
        openLink() {
            if (!this._data.linkUrl)
                return;
            if (this._data.isExternal)
                window.open(this._data.linkUrl);
            else
                window.location.href = this._data.linkUrl;
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.cardStyle },
                this.$render("i-panel", { id: "pnlCard" },
                    this.$render("i-panel", { class: index_css_1.containerStyle },
                        this.$render("i-panel", { id: "pnlCardBody", minHeight: 48 })))));
        }
    };
    Blog = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-scom-blog')
    ], Blog);
    exports.default = Blog;
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-blog/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-blog/global/index.ts", ["require", "exports", "@scom/scom-blog/global/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(utils_1, exports);
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
define("@scom/scom-blog", ["require", "exports", "@ijstech/components", "@scom/scom-blog/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
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
            backgroundColor: {
                type: 'string',
                format: 'color',
            }
        }
    };
    const propertiesSchema = {
        type: 'object',
        properties: {
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            linkUrl: {
                type: 'string'
            },
            isExternal: {
                type: 'boolean'
            },
            date: {
                type: 'string',
                format: 'date'
            },
            backgroundImage: {
                type: 'string'
            },
            userName: {
                type: 'string'
            },
            avatar: {
                type: 'string'
            }
        }
    };
    const defaultColors = {
        dateColor: '#565656',
        userNameColor: '#565656',
        overlayBackgroundColor: '#fff'
    };
    let Blog = class Blog extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this._oldData = {
                title: '',
                backgroundImage: ''
            };
            this._data = {
                title: '',
                backgroundImage: ''
            };
            this.oldTag = {};
            this.defaultEdit = true;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data) {
                this.setData(data);
            }
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._oldData = Object.assign({}, this._data);
            this._data = data;
            this.onUpdateBlock(this.tag);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            this.onUpdateBlock(value);
        }
        getConfigSchema() {
            return configSchema;
        }
        onConfigSave(config) {
            this.tag = config;
            this.onUpdateBlock(config);
        }
        async edit() {
        }
        async confirm() {
            this.onUpdateBlock(this.tag);
        }
        async discard() {
        }
        async config() { }
        getActions() {
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
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(userInputData);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._oldData);
                                this.setData(this._oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                this.oldTag = Object.assign({}, this.tag);
                                this.setTag(userInputData);
                                if (builder)
                                    builder.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.setTag(this.oldTag);
                                if (builder)
                                    builder.setTag(this.oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            return actions;
        }
        onUpdateBlock(config) {
            const { titleFontColor = Theme.text.primary, descriptionFontColor = Theme.text.primary, linkTextColor = Theme.colors.primary.main, dateColor = defaultColors.dateColor, userNameColor = defaultColors.userNameColor } = config || {};
            this.pnlCardBody.clearInnerHTML();
            this.pnlCardBody.appendChild(this.$render("i-grid-layout", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, border: { radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, templateAreas: [
                    ["areaImg"], ["areaDate"], ["areaDetails"]
                ], onClick: () => this.openLink() },
                this.$render("i-panel", { overflow: { x: 'hidden', y: 'hidden' }, position: "relative", padding: { top: '56.25%' } },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", grid: { area: "areaImg" }, url: this._data.backgroundImage, position: "absolute", left: "0px", top: "0px" })),
                this.$render("i-panel", { padding: { top: '0.938rem', bottom: '0.938rem', left: '0.938rem', right: '0.938rem' } },
                    this.$render("i-hstack", { grid: { area: "areaDate" }, verticalAlignment: "center", gap: "0.938rem", margin: { bottom: '1.875rem' } },
                        this.$render("i-panel", { width: 50, height: 50, visible: !!this._data.avatar },
                            this.$render("i-image", { width: "100%", height: "100%", url: this._data.avatar, display: "block", class: index_css_1.avatarStyle })),
                        this.$render("i-vstack", { verticalAlignment: "center" },
                            this.$render("i-label", { id: "dateLb", caption: this.formatDate(this._data.date), font: { size: '0.75rem', color: dateColor } }),
                            this.$render("i-label", { id: "usernameLb", caption: this._data.userName, font: { size: '0.75rem', color: userNameColor } }))),
                    this.$render("i-vstack", { grid: { area: "areaDetails" }, verticalAlignment: "center", gap: "0.25rem", padding: { bottom: '1rem' } },
                        this.$render("i-panel", { minHeight: "3rem" },
                            this.$render("i-label", { id: "titleLb", caption: this._data.title, font: { weight: 700, size: '1.25rem', color: titleFontColor } }),
                            this.$render("i-label", { id: "descriptionLb", caption: this._data.description, font: { size: '0.875rem', color: descriptionFontColor } })),
                        this.$render("i-label", { id: "linkLb", caption: "Read More", link: { href: this._data.linkUrl, target: this._data.isExternal ? "_blank" : "_self" }, font: { weight: 700, size: '0.875rem', color: linkTextColor } })))));
        }
        formatDate(date) {
            if (!date)
                return '';
            return date.format('MMMM DD, YYYY');
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
                        this.$render("i-panel", { id: "pnlCardBody" })))));
        }
    };
    Blog = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-blog')
    ], Blog);
    exports.default = Blog;
});

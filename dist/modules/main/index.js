var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@blog/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
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
define("@blog/main", ["require", "exports", "@ijstech/components", "@blog/config", "@blog/main/index.css.ts"], function (require, exports, components_2, config_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    exports.Config = config_1.default;
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
            overlayBackgroundColor: {
                type: 'string',
                format: 'color',
            }
        }
    };
    let Blog = class Blog extends components_2.Module {
        constructor() {
            super(...arguments);
            this._data = {
                title: '',
                backgroundImage: ''
            };
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.cardConfig.data = data;
            this.onUpdateBlock(this.tag);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            this.onUpdateSettings(value);
        }
        getConfigSchema() {
            return configSchema;
        }
        onConfigSave(config) {
            this.tag = config;
            this.onUpdateSettings(config);
        }
        async edit() {
            this.cardConfig.data = this._data;
            this.pnlCard.visible = false;
            this.cardConfig.visible = true;
        }
        async confirm() {
            this._data = this.cardConfig.data;
            this.onUpdateBlock(this.tag);
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
            const emptyProp = !data.title || !data.backgroundImage;
            if (emptyProp) {
                this.alertElm.message = {
                    status: 'error',
                    content: 'Required field is missing.'
                };
                this.alertElm.showModal();
                return false;
            }
            return true;
        }
        onUpdateBlock(config) {
            const isOverlay = this._data.textOverlay || false;
            isOverlay ? this.renderOverlay(config) : this.renderNoOverlay(config);
        }
        onUpdateSettings(config) {
            const { titleFontColor = Theme.text.primary, descriptionFontColor = Theme.text.primary, linkTextColor = Theme.colors.primary.main, dateColor = '#565656', userNameColor = '#565656', overlayBackgroundColor } = config || {};
            this.titleLb.font = { weight: 700, size: '1.25rem', color: titleFontColor };
            this.descriptionLb.font = { size: '0.875rem', color: descriptionFontColor };
            if (this.dateLb)
                this.dateLb.font = { size: '0.75rem', color: dateColor };
            if (this.dateIcon)
                this.dateIcon.fill = dateColor;
            if (this.usernameLb)
                this.usernameLb.font = { size: '0.75rem', color: userNameColor };
            if (this.usernameIcon)
                this.usernameIcon.fill = userNameColor;
            if (this.linkLb)
                this.linkLb.font = { weight: 700, size: '0.875rem', color: linkTextColor };
            if (this.overlayStack)
                this.overlayStack.background = { color: overlayBackgroundColor };
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
        renderNoOverlay(config) {
            const { titleFontColor = Theme.text.primary, descriptionFontColor = Theme.text.primary, linkTextColor = Theme.colors.primary.main, dateColor = '#565656', userNameColor = '#565656' } = config || {};
            this.pnlCardBody.clearInnerHTML();
            this.pnlCardBody.appendChild(this.$render("i-grid-layout", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, border: { radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, gap: { column: '1rem', row: '0.938rem' }, templateAreas: [
                    ["areaImg"], ["areaDate"], ["areaDetails"]
                ], onClick: () => this.openLink() },
                this.$render("i-panel", { overflow: { x: 'hidden', y: 'hidden' }, position: "relative", padding: { top: '56.25%' } },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", grid: { area: "areaImg" }, url: this._data.backgroundImage, position: "absolute", left: "0px", top: "0px" })),
                this.$render("i-panel", { padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' } },
                    this.$render("i-hstack", { grid: { area: "areaDate" }, verticalAlignment: "center", gap: "0.938rem", margin: { bottom: '1.875rem' } },
                        this.$render("i-panel", { width: 50, height: 50, visible: !!this._data.avatar },
                            this.$render("i-image", { width: "100%", height: "100%", url: this._data.avatar, display: "block", class: index_css_1.avatarStyle })),
                        this.$render("i-vstack", { verticalAlignment: "center" },
                            this.$render("i-label", { id: "dateLb", caption: this.formatDate(this._data.date), font: { size: '0.75rem', color: dateColor } }),
                            this.$render("i-label", { id: "usernameLb", caption: this._data.userName, font: { size: '0.75rem', color: userNameColor } }))),
                    this.$render("i-vstack", { grid: { area: "areaDetails" }, verticalAlignment: "center", gap: "0.25rem", padding: { bottom: '1rem' } },
                        this.$render("i-panel", { minHeight: 48 },
                            this.$render("i-label", { id: "titleLb", caption: this._data.title, font: { weight: 700, size: '1.25rem', color: titleFontColor } }),
                            this.$render("i-label", { id: "descriptionLb", caption: this._data.description, font: { size: '0.875rem', color: descriptionFontColor } })),
                        this.$render("i-label", { id: "linkLb", caption: "Read More", link: { href: this._data.linkUrl, target: this._data.isExternal ? "_blank" : "_self" }, font: { weight: 700, size: '0.875rem', color: linkTextColor } })))));
        }
        renderOverlay(config) {
            const { titleFontColor = Theme.text.primary, descriptionFontColor = Theme.text.primary, dateColor = '#565656', userNameColor = '#565656', overlayBackgroundColor = '#fff' } = config || {};
            this.pnlCardBody.clearInnerHTML();
            this.pnlCardBody.appendChild(this.$render("i-grid-layout", { width: "100%", height: "100%", minHeight: 200, class: index_css_1.cardItemStyle, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, gap: { column: '1rem', row: '1rem' }, templateAreas: [
                    ["areaImg"], ["areaDetails"], ["areaDate"]
                ], position: "relative", onClick: () => this.openLink() },
                this.$render("i-panel", { overflow: { x: 'hidden', y: 'hidden' }, position: "relative", padding: { top: '50%' } },
                    this.$render("i-image", { class: index_css_1.imageOverlayStyle, width: '100%', height: '100%', grid: { area: "areaImg" }, url: this._data.backgroundImage, position: "absolute", left: "0px", top: "0px" })),
                this.$render("i-vstack", { id: "overlayStack", background: { color: overlayBackgroundColor }, padding: { top: '1rem', bottom: '1rem', left: '0.75rem', right: '0.75rem' }, position: "absolute", width: "calc(100% - 1rem)", zIndex: 9, bottom: "0.5rem", left: "0.5rem", gap: "0.5rem" },
                    this.$render("i-vstack", { grid: { area: "areaDetails" }, verticalAlignment: "center", minHeight: 48 },
                        this.$render("i-label", { id: "titleLb", caption: this._data.title, font: { weight: 700, size: '1.25rem', color: titleFontColor } }),
                        this.$render("i-label", { id: "descriptionLb", caption: this._data.description, font: { size: '0.875rem', color: descriptionFontColor } })),
                    this.$render("i-hstack", { grid: { area: "areaDate" }, gap: "10px", verticalAlignment: "center" },
                        this.$render("i-hstack", { gap: "4px", visible: !!this._data.date, verticalAlignment: "center" },
                            this.$render("i-icon", { id: "dateIcon", name: "calendar", width: 12, height: 12, fill: dateColor }),
                            this.$render("i-label", { id: "dateLb", caption: this.formatDate(this._data.date), font: { size: '0.75rem', color: dateColor } })),
                        this.$render("i-hstack", { gap: "4px", visible: !!this._data.userName, verticalAlignment: "center" },
                            this.$render("i-icon", { id: "usernameIcon", name: "eye", width: 12, height: 12, fill: userNameColor }),
                            this.$render("i-label", { id: "usernameLb", caption: this._data.userName, font: { size: '0.75rem', color: userNameColor } }))))));
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.cardStyle },
                this.$render("i-panel", { id: "pnlCard" },
                    this.$render("i-panel", { class: index_css_1.containerStyle },
                        this.$render("i-panel", { id: "pnlCardBody" }))),
                this.$render("pageblock-blog-config", { id: "cardConfig", visible: false }),
                this.$render("pageblock-blog-alert", { id: "alertElm" })));
        }
    };
    Blog = __decorate([
        components_2.customModule
    ], Blog);
    exports.default = Blog;
});

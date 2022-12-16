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
    let Blog = class Blog extends components_2.Module {
        constructor() {
            super(...arguments);
            // private pnlCardHeader: HStack;
            // private pnlCardFooter: Panel;
            // private pnlControls: HStack;
            this._data = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.cardConfig.data = data;
            this.onUpdateBlock();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        async edit() {
            this.cardConfig.data = this._data;
            this.pnlCard.visible = false;
            this.cardConfig.visible = true;
        }
        async confirm() {
            this._data = this.cardConfig.data;
            this.onUpdateBlock();
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
            const emptyName = !data.title || !data.background;
            return !emptyName;
        }
        onUpdateBlock() {
            this.renderUI();
        }
        formatDate(date) {
            if (!date)
                return '';
            return date.format('MMMM DD, YYYY');
        }
        openLink() {
            if (!this._data.viewAllUrl)
                return;
            if (this._data.isExternal)
                window.open(this._data.viewAllUrl);
            else
                window.location.href = this._data.viewAllUrl;
        }
        renderUI() {
            const isOverlay = this._data.backgroundOverlay || false;
            if (isOverlay)
                this.renderOverlay();
            else
                this.renderNoOverlay();
        }
        renderNoOverlay() {
            this.pnlCardBody.clearInnerHTML();
            this.pnlCardBody.appendChild(this.$render("i-grid-layout", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, gap: { column: '1rem', row: '1rem' }, templateAreas: [
                    ["areaImg"], ["areaDate"], ["areaDetails"]
                ], onClick: () => this.openLink() },
                this.$render("i-panel", { overflow: { x: 'hidden', y: 'hidden' }, position: "relative", padding: { top: '56.25%' } },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: "100%", grid: { area: "areaImg" }, url: this._data.background, position: "absolute", left: "0px", top: "0px" })),
                this.$render("i-hstack", { grid: { area: "areaDate" }, verticalAlignment: "center", gap: "0.5rem" },
                    this.$render("i-panel", { width: 30, height: 30, visible: !!this._data.avatar },
                        this.$render("i-image", { width: "100%", height: "100%", url: this._data.avatar, display: "block", class: index_css_1.avatarStyle })),
                    this.$render("i-vstack", { verticalAlignment: "center" },
                        this.$render("i-label", { caption: this.formatDate(this._data.date), font: { size: '0.75rem', color: 'rgba(117,124,131,.68)' } }),
                        this.$render("i-label", { caption: this._data.userName, font: { size: '0.75rem', color: 'rgba(117,124,131,.68)' } }))),
                this.$render("i-vstack", { grid: { area: "areaDetails" }, verticalAlignment: "center", gap: "0.25rem", padding: { bottom: '1rem' } },
                    this.$render("i-label", { caption: this._data.title, font: { weight: 600, size: '1.125rem' } }),
                    this.$render("i-label", { caption: this._data.description, font: { size: '0.875rem' } }),
                    this.$render("i-label", { caption: "Read More", link: { href: this._data.viewAllUrl, target: this._data.isExternal ? "_blank" : "_self" }, font: { weight: 600, size: '0.75rem', color: Theme.colors.primary.main } }))));
        }
        renderOverlay() {
            this.pnlCardBody.clearInnerHTML();
            const fontColor = this._data.textOverlay || Theme.text.primary;
            const dateColor = this._data.textOverlay || 'rgba(117,124,131,.68)';
            this.pnlCardBody.appendChild(this.$render("i-grid-layout", { width: "100%", height: "100%", minHeight: 200, class: index_css_1.cardItemStyle, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { radius: 5, width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, gap: { column: '1rem', row: '1rem' }, templateAreas: [
                    ["areaImg"], ["areaDetails"], ["areaDate"]
                ], position: "relative", onClick: () => this.openLink() },
                this.$render("i-panel", { overflow: { x: 'hidden', y: 'hidden' }, position: "relative", padding: { top: '50%' } },
                    this.$render("i-image", { class: index_css_1.imageOverlayStyle, width: '100%', height: '100%', grid: { area: "areaImg" }, url: this._data.background, position: "absolute", left: "0px", top: "0px" })),
                this.$render("i-vstack", { background: { color: this._data.backgroundOverlay }, padding: { top: '1rem', bottom: '1rem', left: '0.75rem', right: '0.75rem' }, position: "absolute", width: "calc(100% - 1rem)", zIndex: 9, bottom: "0.5rem", left: "0.5rem", gap: "0.5rem" },
                    this.$render("i-vstack", { grid: { area: "areaDetails" }, verticalAlignment: "center" },
                        this.$render("i-label", { caption: this._data.title, font: { weight: 600, size: '1.25rem', color: fontColor } }),
                        this.$render("i-label", { caption: this._data.description, font: { size: '0.875rem', color: fontColor } })),
                    this.$render("i-hstack", { grid: { area: "areaDate" }, gap: "10px", verticalAlignment: "center" },
                        this.$render("i-hstack", { gap: "4px", visible: !!this._data.date, verticalAlignment: "center" },
                            this.$render("i-icon", { name: "calendar", width: 12, height: 12, fill: dateColor }),
                            this.$render("i-label", { caption: this.formatDate(this._data.date), font: { size: '0.75rem', color: dateColor } })),
                        this.$render("i-hstack", { gap: "4px", visible: !!this._data.userName, verticalAlignment: "center" },
                            this.$render("i-icon", { name: "eye", width: 12, height: 12, fill: dateColor }),
                            this.$render("i-label", { caption: this._data.userName, font: { size: '0.75rem', color: dateColor } }))))));
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.cardStyle },
                this.$render("i-panel", { id: "pnlCard" },
                    this.$render("i-panel", { class: index_css_1.containerStyle },
                        this.$render("i-hstack", { id: "pnlCardHeader" }),
                        this.$render("i-panel", { id: "pnlCardBody" }),
                        this.$render("i-panel", { id: "pnlCardFooter" }))),
                this.$render("pageblock-blog-config", { id: "cardConfig", visible: false })));
        }
    };
    Blog = __decorate([
        components_2.customModule
    ], Blog);
    exports.default = Blog;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@blog/config/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noWrapStyle = exports.pointerStyle = exports.uploadStyle = exports.textareaStyle = void 0;
    exports.textareaStyle = components_1.Styles.style({
        $nest: {
            'textarea': {
                border: 'none',
                outline: 'none'
            }
        }
    });
    exports.uploadStyle = components_1.Styles.style({
        $nest: {
            '.i-upload_preview-img': {
                maxHeight: '100%',
                display: 'block'
            },
            '.i-upload-wrapper': {
                maxHeight: 'inherit',
                overflow: 'hidden'
            }
        }
    });
    exports.pointerStyle = components_1.Styles.style({
        cursor: 'pointer'
    });
    exports.noWrapStyle = components_1.Styles.style({
        whiteSpace: 'nowrap'
    });
});
define("@blog/config", ["require", "exports", "@ijstech/components", "@blog/config/config.css.ts"], function (require, exports, components_2, config_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Config = class Config extends components_2.Module {
        constructor() {
            super(...arguments);
            this.edtBackground = '';
            this.edtAvatar = '';
        }
        get data() {
            const _data = {
                title: this.edtTitle.value || "",
                description: this.edtDesc.value || "",
                viewAllUrl: this.edtViewAllUrl.value || "",
                date: this.edtDate.value || components_2.moment(),
                userName: this.edtUsername.value || '',
                background: this.edtBackground || '',
                avatar: this.edtAvatar || '',
                backgroundOverlay: this.edtOverlayBg.value || '',
                textOverlay: this.edtOverlayColor.value || '',
                isExternal: this.isExternalCheck.checked
            };
            return _data;
        }
        set data(config) {
            this.edtTitle.value = config.title || "";
            this.edtDesc.value = config.description || "";
            this.edtViewAllUrl.value = config.viewAllUrl || "";
            this.edtUsername.value = config.userName || "";
            this.edtOverlayBg.value = config.backgroundOverlay || "";
            this.edtOverlayColor.value = config.textOverlay || "";
            this.edtDate.value = config.date || components_2.moment();
            this.isExternalCheck.checked = config.isExternal || false;
            if (config.background && this.edtBackgroundElm)
                this.edtBackgroundElm.preview(config.background);
            if (config.avatar && this.edtAvatarElm)
                this.edtAvatarElm.preview(config.avatar);
        }
        async onChangedImage(source, files, prop) {
            const file = files[0];
            this[prop] = file ? await source.toBase64(file) : '';
        }
        onRemovedImage(prop) {
            this[prop] = '';
        }
        init() {
            super.init();
            this.edtDate.value = components_2.moment();
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-label", { caption: "Background:" }),
                this.$render("i-upload", { id: "edtBackgroundElm", maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, onChanged: (source, files) => this.onChangedImage(source, files, 'edtBackground'), onRemoved: () => this.onRemovedImage('edtBackground') }),
                this.$render("i-label", { caption: "Title:" }),
                this.$render("i-input", { id: "edtTitle", width: "100%" }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea' }),
                this.$render("i-label", { caption: "Link:" }),
                this.$render("i-input", { id: "edtViewAllUrl", width: "100%" }),
                this.$render("i-checkbox", { id: "isExternalCheck", caption: 'External Link', checked: false }),
                this.$render("i-label", { caption: "Avatar:" }),
                this.$render("i-upload", { id: "edtAvatarElm", maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, onChanged: (source, files) => this.onChangedImage(source, files, 'edtAvatar'), onRemoved: () => this.onRemovedImage('edtAvatar') }),
                this.$render("i-label", { caption: "Text overlay:" }),
                this.$render("i-hstack", { verticalAlignment: "center", gap: "1rem", width: "100%" },
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "8px" },
                        this.$render("i-label", { caption: "Background Color:", class: config_css_1.noWrapStyle }),
                        this.$render("i-input", { id: "edtOverlayBg", width: "100px", inputType: "color" })),
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "8px" },
                        this.$render("i-label", { caption: "Font Color:", class: config_css_1.noWrapStyle }),
                        this.$render("i-input", { id: "edtOverlayColor", width: "100px", inputType: "color", value: "" }))),
                this.$render("i-label", { caption: "Date:" }),
                this.$render("i-datepicker", { id: "edtDate", width: "100%" }),
                this.$render("i-label", { caption: "User name:" }),
                this.$render("i-input", { id: "edtUsername", width: "100%" })));
        }
    };
    Config = __decorate([
        components_2.customModule,
        components_2.customElements("pageblock-blog-config")
    ], Config);
    exports.default = Config;
});

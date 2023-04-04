var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/main", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Main = class Main extends components_1.Module {
        set maxWidth(value) {
            this.style.maxWidth = "";
        }
        render() {
            return this.$render("i-panel", null,
                this.$render("i-scom-blog", { data: {
                        title: 'Title',
                        description: 'Description',
                        backgroundImage: 'https://images.unsplash.com/photo-1676715051398-ce7f932dcd5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80',
                        date: '01/01/2001',
                        userName: 'User',
                        avatar: 'https://images.unsplash.com/photo-1678198628337-e0f4abe54593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
                    } }));
        }
    };
    Main = __decorate([
        components_1.customModule
    ], Main);
    exports.default = Main;
});

/// <amd-module name="@scom/page-blog/interface.ts" />
declare module "@scom/page-blog/interface.ts" {
    import { IBorder, IFont, ISpace } from "@ijstech/components";
    export interface IBlogItem {
        title: string;
        backgroundImageCid?: string;
        backgroundImageUrl?: string;
        description?: string;
        link?: {
            caption?: string;
            url?: string;
        };
        date?: string;
        userName?: string;
        avatar?: string;
        isExternal?: boolean;
        isOverlay?: boolean;
    }
    interface IColors {
    }
    interface IStyles {
        font?: IFont;
        opacity?: number;
        lineClamp?: number;
    }
    export interface IBlogSettings {
        title?: IStyles;
        description?: IStyles;
        date?: IStyles;
        userName?: IStyles;
        link?: IStyles;
        boxShadow?: string;
        border?: IBorder;
        background?: {
            color?: string;
        };
        padding?: ISpace;
        gap?: string | number;
        light?: IColors;
        dark?: IColors;
    }
}
/// <amd-module name="@scom/page-blog/index.css.ts" />
declare module "@scom/page-blog/index.css.ts" {
    export const cardStyle: string;
    export const cardItemStyle: string;
    export const imageStyle: string;
    export const getCustomButtonStyle: (background: string, color: string) => string;
}
/// <amd-module name="@scom/page-blog/model/index.ts" />
declare module "@scom/page-blog/model/index.ts" {
    import { IBlogItem, IBlogSettings } from "@scom/page-blog/interface.ts";
    interface IOptions {
        onUpdateBlock?: () => void;
    }
    export class Model {
        private _data;
        private _tag;
        private _options;
        constructor(options: IOptions);
        get tag(): IBlogSettings;
        set tag(value: IBlogSettings);
        get data(): IBlogItem;
        set data(value: IBlogItem);
        setData(data: IBlogItem): Promise<void>;
        private getData;
        setTag(value: IBlogSettings): void;
        private updateTag;
        private getTag;
        getConfigurators(): {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
    }
}
/// <amd-module name="@scom/page-blog/utils.ts" />
declare module "@scom/page-blog/utils.ts" {
    const formatDate: (date: any) => string;
    const merge: (...objects: any[]) => any;
    const defaultSettings: {
        date: {
            font: {
                size: string;
                color: string;
            };
        };
        userName: {
            font: {
                size: string;
                color: string;
            };
        };
        title: {
            font: {
                weight: number;
                size: string;
                color: string;
            };
        };
        description: {
            font: {
                size: string;
                color: string;
            };
        };
        link: {
            font: {
                weight: number;
                size: string;
                color: string;
            };
            padding: {
                top: string;
                bottom: string;
                left: string;
                right: string;
            };
            margin: {
                top: string;
                bottom: string;
                left: string;
                right: string;
            };
            background: {
                color: string;
            };
        };
    };
    export { formatDate, merge, defaultSettings };
}
/// <amd-module name="@scom/page-blog/translation.json.ts" />
declare module "@scom/page-blog/translation.json.ts" {
    const _default: {
        en: {
            read_more: string;
        };
        "zh-hant": {
            read_more: string;
        };
        vi: {
            read_more: string;
        };
    };
    export default _default;
}
/// <amd-module name="@scom/page-blog" />
declare module "@scom/page-blog" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IBlogItem, IBlogSettings } from "@scom/page-blog/interface.ts";
    export { IBlogItem, IBlogSettings };
    interface ScomBlogElement extends ControlElement {
        data?: IBlogItem;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-page-blog']: ScomBlogElement;
            }
        }
    }
    export default class ScomPageBlog extends Module {
        private pnlCard;
        private pnlBlock;
        private model;
        private titleLb;
        get data(): IBlogItem;
        set data(value: IBlogItem);
        static create(options?: ScomBlogElement, parent?: Container): Promise<ScomPageBlog>;
        constructor(parent?: Container, options?: ScomBlogElement);
        init(): void;
        private setData;
        getConfigurators(): {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        private onUpdateBlock;
        private openLink;
        render(): any;
    }
}

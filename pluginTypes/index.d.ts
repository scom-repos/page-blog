/// <amd-module name="@scom/page-blog/interface.ts" />
declare module "@scom/page-blog/interface.ts" {
    import { IconName, IDataSchema, IUISchema } from "@ijstech/components";
    export interface IConfig {
        title: string;
        backgroundImageCid?: string;
        backgroundImageUrl?: string;
        description?: string;
        link?: string;
        date?: string;
        userName?: string;
        avatar?: string;
        isExternal?: boolean;
    }
    interface IColors {
        titleColor?: string;
        descriptionColor?: string;
        linkColor?: string;
        dateColor?: string;
        userNameColor?: string;
        backgroundColor?: string;
    }
    export interface ISettings {
        titleFontSize?: string;
        descriptionFontSize?: string;
        linkTextSize?: string;
        dateFontSize?: string;
        userNameFontSize?: string;
        boxShadow?: string;
        light?: IColors;
        dark?: IColors;
    }
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
    export interface IPageBlockAction {
        name?: string;
        icon?: IconName;
        command?: (builder: any, userInputData: any) => ICommand;
        userInputDataSchema?: IDataSchema;
        userInputUISchema?: IUISchema;
    }
}
/// <amd-module name="@scom/page-blog/index.css.ts" />
declare module "@scom/page-blog/index.css.ts" {
    export const cardStyle: string;
    export const cardItemStyle: string;
    export const imageStyle: string;
    export const controlStyle: string;
    export const containerStyle: string;
}
/// <amd-module name="@scom/page-blog/model/formSchema.ts" />
declare module "@scom/page-blog/model/formSchema.ts" {
    import { IUISchema, IDataSchema } from "@ijstech/components";
    const propertiesSchema: IDataSchema;
    const propertiesUISchema: IUISchema;
    const themeSchema: IDataSchema;
    export { propertiesSchema, propertiesUISchema, themeSchema };
}
/// <amd-module name="@scom/page-blog/model/index.ts" />
declare module "@scom/page-blog/model/index.ts" {
    import { IConfig, IPageBlockAction, ISettings } from "@scom/page-blog/interface.ts";
    interface IOptions {
        onUpdateBlock?: () => void;
        onUpdateTheme?: () => void;
    }
    export class Model {
        private _data;
        private _tag;
        private _options;
        constructor(options: IOptions);
        get tag(): ISettings;
        set tag(value: ISettings);
        get data(): IConfig;
        set data(value: IConfig);
        setData(data: IConfig): Promise<void>;
        private getData;
        setTag(value: ISettings): void;
        private updateTag;
        private getTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => IPageBlockAction[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        private _getActions;
    }
}
/// <amd-module name="@scom/page-blog/utils.ts" />
declare module "@scom/page-blog/utils.ts" {
    const formatDate: (date: any) => string;
    const defaultSettings: {
        light: {
            titleColor: string;
            descriptionColor: string;
            linkColor: string;
            dateColor: string;
            userNameColor: string;
            backgroundColor: string;
        };
        dark: {
            titleColor: string;
            descriptionColor: string;
            linkColor: string;
            dateColor: string;
            userNameColor: string;
            backgroundColor: string;
        };
    };
    export { formatDate, defaultSettings };
}
/// <amd-module name="@scom/page-blog" />
declare module "@scom/page-blog" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig } from "@scom/page-blog/interface.ts";
    interface ScomBlogElement extends ControlElement {
        lazyLoad?: boolean;
        data?: IConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-page-blog']: ScomBlogElement;
            }
        }
    }
    export default class ScomPageBlog extends Module {
        private pnlCard;
        private model;
        get data(): IConfig;
        set data(value: IConfig);
        static create(options?: ScomBlogElement, parent?: Container): Promise<ScomPageBlog>;
        constructor(parent?: Container, options?: ScomBlogElement);
        init(): void;
        private setData;
        private setTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => import("@scom/page-blog/interface.ts").IPageBlockAction[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        private onUpdateBlock;
        private openLink;
        private onUpdateTheme;
        private updateStyle;
        render(): any;
    }
}

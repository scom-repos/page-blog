/// <amd-module name="@scom/scom-blog/global/utils.ts" />
declare module "@scom/scom-blog/global/utils.ts" {
    import { IconName, IDataSchema, IUISchema } from "@ijstech/components";
    export interface IConfig {
        title: string;
        backgroundImage: string;
        description?: string;
        linkUrl?: string;
        date?: string;
        userName?: string;
        avatar?: string;
        isExternal?: boolean;
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
/// <amd-module name="@scom/scom-blog/global/index.ts" />
declare module "@scom/scom-blog/global/index.ts" {
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
    export * from "@scom/scom-blog/global/utils.ts";
}
/// <amd-module name="@scom/scom-blog/index.css.ts" />
declare module "@scom/scom-blog/index.css.ts" {
    export const cardStyle: string;
    export const cardItemStyle: string;
    export const imageStyle: string;
    export const imageOverlayStyle: string;
    export const avatarStyle: string;
    export const controlStyle: string;
    export const containerStyle: string;
}
/// <amd-module name="@scom/scom-blog" />
declare module "@scom/scom-blog" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { PageBlock, IConfig, IPageBlockAction } from "@scom/scom-blog/global/index.ts";
    interface ScomBlogElement extends ControlElement {
        data?: IConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-blog']: ScomBlogElement;
            }
        }
    }
    export default class Blog extends Module implements PageBlock {
        private pnlCard;
        private pnlCardBody;
        private _oldData;
        private _data;
        private oldTag;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomBlogElement, parent?: Container): Promise<Blog>;
        constructor(parent?: Container, options?: ScomBlogElement);
        init(): void;
        getData(): IConfig;
        setData(data: IConfig): Promise<void>;
        getTag(): any;
        setTag(value: any): Promise<void>;
        getConfigSchema(): {
            type: string;
            required: any[];
            properties: {
                titleFontColor: {
                    type: string;
                    format: string;
                };
                descriptionFontColor: {
                    type: string;
                    format: string;
                };
                linkTextColor: {
                    type: string;
                    format: string;
                };
                dateColor: {
                    type: string;
                    format: string;
                };
                userNameColor: {
                    type: string;
                    format: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
            };
        };
        onConfigSave(config: any): void;
        edit(): Promise<void>;
        confirm(): Promise<void>;
        discard(): Promise<void>;
        config(): Promise<void>;
        getActions(): IPageBlockAction[];
        _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema): IPageBlockAction[];
        private onUpdateBlock;
        private formatDate;
        private openLink;
        render(): any;
    }
}

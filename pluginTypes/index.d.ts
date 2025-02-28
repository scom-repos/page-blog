/// <amd-module name="@scom/scom-blog/interface.ts" />
declare module "@scom/scom-blog/interface.ts" {
    import { IconName, IDataSchema, IUISchema } from "@ijstech/components";
    export interface IConfig {
        title: string;
        backgroundImageCid?: string;
        backgroundImageUrl?: string;
        description?: string;
        linkUrl?: string;
        date?: string;
        userName?: string;
        avatar?: string;
        isExternal?: boolean;
        titleFontColor?: string;
        descriptionFontColor?: string;
        linkTextColor?: string;
        dateColor?: string;
        userNameColor?: string;
        backgroundColor?: string;
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
/// <amd-module name="@scom/scom-blog/model/formSchema.ts" />
declare module "@scom/scom-blog/model/formSchema.ts" {
    import { IUISchema, IDataSchema } from "@ijstech/components";
    const propertiesSchema: IDataSchema;
    const propertiesUISchema: IUISchema;
    export { propertiesSchema, propertiesUISchema };
}
/// <amd-module name="@scom/scom-blog/model/index.ts" />
declare module "@scom/scom-blog/model/index.ts" {
    export * from "@scom/scom-blog/model/formSchema.ts";
}
/// <amd-module name="@scom/scom-blog" />
declare module "@scom/scom-blog" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig, IPageBlockAction } from "@scom/scom-blog/interface.ts";
    interface ScomBlogElement extends ControlElement {
        lazyLoad?: boolean;
        data?: IConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-blog']: ScomBlogElement;
            }
        }
    }
    export default class Blog extends Module {
        private pnlCardBody;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomBlogElement, parent?: Container): Promise<Blog>;
        constructor(parent?: Container, options?: ScomBlogElement);
        init(): void;
        private getData;
        private setData;
        private getTag;
        private setTag;
        private splitData;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => IPageBlockAction[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            splitData: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            splitData: any;
            getActions?: undefined;
        })[];
        private onUpdateBlock;
        private formatDate;
        private openLink;
        render(): any;
    }
}

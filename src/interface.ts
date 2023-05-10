import { IconName, IDataSchema, IUISchema } from "@ijstech/components";

export interface PageBlock {
  // Properties
  getData: () => any;
  setData: (data: any) => Promise<void>;
  getTag: () => any;
  setTag: (tag: any) => Promise<void>
  validate?: () => boolean;
  defaultEdit?: boolean;
  tag?: any;

  // Page Events
  readonly onEdit: () => Promise<void>;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  // onClear: () => void;

  // Page Block Events
  edit: () => Promise<void>;
  confirm: () => Promise<void>;
  discard: () => Promise<void>;
  config: () => Promise<void>;
}

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

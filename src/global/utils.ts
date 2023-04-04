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
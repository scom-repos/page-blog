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
  borderRadius?: string|number;
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

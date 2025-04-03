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
}

interface IColors {
}

interface IStyles {
  font?: IFont;
}

export interface IBlogSettings {
  title?: IStyles;
  description?: IStyles;
  date?: IStyles;
  userName?: IStyles;
  link?: IStyles;
  boxShadow?: string;
  border?: IBorder;
  background?: {color?: string};
  padding?: ISpace;
  light?: IColors;
  dark?: IColors;
}


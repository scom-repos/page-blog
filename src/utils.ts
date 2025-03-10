import { moment, Styles, application } from "@ijstech/components";

const Theme = Styles.Theme.currentTheme;

const formatDate = (date: any) => {
  if (!date) return '';
  const currentLg = application.locale;
  const locale = currentLg.startsWith('zh') ? 'zh-hk' : currentLg;
  if (locale !== moment.locale()) moment.locale(locale);
  return moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
}

const defaultColors = {
  dateColor: '#565656',
  userNameColor: '#565656'
}

const colors = {
  titleColor: defaultColors.dateColor,
  descriptionColor: defaultColors.dateColor,
  linkColor: Theme.colors.primary.main,
  dateColor: defaultColors.dateColor,
  userNameColor: defaultColors.userNameColor,
  backgroundColor: Theme.background.main
}

const defaultSettings = {
  light: {
    ...colors
  },
  dark: {
    ...colors
  }
}

export {
  formatDate,
  defaultSettings
}
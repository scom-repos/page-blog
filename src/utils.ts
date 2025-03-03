import { moment, Styles } from "@ijstech/components";

const Theme = Styles.Theme.currentTheme;

const formatDate = (date: any) => {
  if (!date) return '';
  return moment(date, "YYYY-MM-DD").format('MMMM DD, YYYY');
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
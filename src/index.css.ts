import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const cardStyle = Styles.style({
  $nest: {
    'i-link > a': {
      textDecoration: 'none'
    }
  }
})

export const cardItemStyle = Styles.style({
  cursor: 'pointer',
  $nest: {
    '&:hover i-button': {
      background: Theme.colors.primary.dark,
      color: Theme.colors.primary.contrastText
    },
    '&:hover i-button > i-icon': {
      fill: '#fff !important'
    }
  }
})

export const imageStyle = Styles.style({
  $nest: {
    '> img': {
      objectPosition: 'center'
    }
  }
})

export const getCustomButtonStyle = (background: string, color: string) => {
  return Styles.style({
    $nest: {
      '&:hover': {
        background: background,
        color: color
      }
    }
  });
}
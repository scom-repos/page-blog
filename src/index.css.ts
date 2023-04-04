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
      width: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  }
})

export const imageOverlayStyle = Styles.style({
  $nest: {
    '> img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  }
})

export const avatarStyle = Styles.style({
  $nest: {
    '> img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover'
    }
  }
})

export const controlStyle = Styles.style({
  $nest: {
    'i-button': {
      boxShadow: 'none',
    },
    'i-button > span': {
      display: 'none'
    },
    'i-button:not(.disabled):hover': {
      background: 'transparent',
      boxShadow: 'none',
      borderColor: 'rgba(117,124,131,.68)',
      $nest: {
        '> i-icon': {
          fill: 'rgba(117,124,131,.68) !important'
        }
      }
    }
  }
})

export const containerStyle = Styles.style({
  width: Theme.layout.container.width,
  maxWidth: Theme.layout.container.maxWidth,
  overflow: Theme.layout.container.overflow,
  textAlign: (Theme.layout.container.textAlign as any),
  margin: '0 auto'
})

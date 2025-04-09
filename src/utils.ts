import { moment, Styles, application } from "@ijstech/components";

const Theme = Styles.Theme.currentTheme;

const formatDate = (date: any) => {
  if (!date) return '';
  const currentLg = application.locale;
  const locale = currentLg.startsWith('zh') ? 'zh-hk' : currentLg;
  if (locale !== moment.locale()) moment.locale(locale);
  return moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY');
}

const merge = (...objects: any[]) => {
  return objects.reduce((prev, obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof prev[key] === 'object') prev[key] = merge(prev[key], obj[key]);
        else prev[key] = obj[key];
      }
    }
    return prev;
  }, {});
}

const defaultSettings = {
  date: {
    font: {size: '0.8125rem', color: Theme.text.third}
  },
  userName: {
    font: {size: '0.8125rem', color: Theme.text.disabled}
  },
  title: {
    font: {weight: 700, size:'1.375rem', color: Theme.text.primary}
  },
  description: {
    font: {size: '0.875rem', color: Theme.text.secondary}
  },
  link: {
    font: {weight: 700, size:'0.875rem', color: Theme.text.hint},
    padding: {top: '0px', bottom: '0px', left: '0px', right: '0px'},
    margin: {top: '0px', bottom: '0px', left: '0px', right: '0px'},
    background: {color: 'transparent !important'}
  }
}

export {
  formatDate,
  merge,
  defaultSettings
}
import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
    loaders:[{
        locale: 'en',
        key: 'trans',
        routes: ['/'],
        loader: async () => (
          await import('./assert/json/en.json')
        ).default,
    },{
        locale: 'zh',
        key: 'trans',
        routes: ['/'],
        loader: async () => (
          await import('./assert/json/zh.json')
        ).default,
    }]
})

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);

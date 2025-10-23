import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next'
import enLng from './assert/json/en.json'
import zhLng from './assert/json/zh.json'

/** @type {import('sveltekit-i18n').Config} */

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: enLng
    },
    zh: {
      translation: zhLng
    }
  },
  fallbackLng: 'zh',
  interpolation: {
      escapeValue: false
  }
})

// const config = ({
//     loaders:[{
//         locale: 'en',
//         key: 'trans',
//         routes: ['/'],
//         loader: async () => (
//           await import('./assert/json/en.json')
//         ).default,
//     },{
//         locale: 'zh',
//         key: 'trans',
//         routes: ['/'],
//         loader: async () => (
//           await import('./assert/json/zh.json')
//         ).default,
//     }]
// })

export const i18n = createI18nStore(i18next);

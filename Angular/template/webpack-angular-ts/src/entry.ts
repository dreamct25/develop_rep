import 'zone.js/dist/zone'; 
import globalStyle from './globalStyle.scss'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

// 因全局 scss 都已轉為文本所已透過此方式全局注入
const globalStyleNode:HTMLStyleElement = document.createElement('style');

globalStyleNode.textContent = globalStyle;

globalStyleNode.setAttribute('type','text/css');

document.head.appendChild(globalStyleNode);

if (process.env.APP_ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
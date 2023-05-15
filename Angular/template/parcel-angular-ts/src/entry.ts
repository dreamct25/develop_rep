import 'zone.js/dist/zone'; 
import './globalStyle.scss'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app.module';

if (process.env.NODE_ENV.trim() === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
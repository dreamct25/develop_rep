import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { 
  provideRouter, 
  withHashLocation, 
  withComponentInputBinding 
} from '@angular/router';

import routes from './app.routing';

export default {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes, 
      withHashLocation(),
      withComponentInputBinding(),
    ),
  ],
} as ApplicationConfig
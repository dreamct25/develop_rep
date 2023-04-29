import { Component } from '@angular/core';
import html from 'bundle-text:./app.component.html'
import scss from 'bundle-text:./app.component.scss'

@Component({
  selector: 'app',
  template: `${html}`,
  styles: [`${scss}`],
})
export class AppComponent { }
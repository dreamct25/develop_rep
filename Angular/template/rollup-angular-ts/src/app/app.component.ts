import { Component } from '@angular/core';
import html from './app.component.html'
import scss from './app.component.scss'

@Component({
  selector: 'app',
  template: `${html}`,
  styles: [`${scss}`],
})
export class AppComponent { 
  public inputVal:string = ""
}
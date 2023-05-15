import { Component } from '@angular/core';
import html from './app.component.html'
import scss from 'bundle-text:./app.component.scss'

@Component({
  selector: 'app',
  template: `${html}`,
  styles: [`${scss}`],
})
export class AppComponent {
  public inputVal:string = ""

  onInputChange() {
    console.log(this.inputVal);
  }
}
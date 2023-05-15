import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import html from './pageII.container.html'
import scss from './pageII.container.scss'

@Component({
  selector: 'app-pageII',
  template: `${html}`,
  styles: [`${scss}`]
})
export class PageII implements OnInit {
  public routeState:string = ""

  constructor(@Inject(Router) private router:Router){
    this.routeState = JSON.stringify(this.router.getCurrentNavigation().extras.state)
  }

  ngOnInit(){

  }
}
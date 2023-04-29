import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras,ActivationEnd } from '@angular/router';
import html from './main.component.html'
import scss from './main.component.scss'
console.log(scss)

@Component({
  selector: 'app-main',
  template: `${html}`,
  styles: [`${scss}`]
})

export class MainComponent implements OnInit {
  public currentPathName:string = ''

  /* constructor(private route:ActivatedRoute,private router:Router){}

  goPage(routPath:string): void {
    const obj:NavigationExtras = routPath === 'pageI' ? {
      queryParams:{
        a:10,
        b:20
      }
    } : {
      state:{
        say: 'hello PageII'
      }
    }

    this.router.navigate([routPath],{ ...obj })
  }

  ngOnInit(): void {
    this.router.events.subscribe(obj => {
      if(obj instanceof ActivationEnd){
        this.currentPathName = obj.snapshot.routeConfig.path
      }
    })
  } */

  ngOnInit(): void {

  }
}
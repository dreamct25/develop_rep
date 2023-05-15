import { Component, OnInit,Inject } from '@angular/core';
import { Router, NavigationExtras,ActivationEnd } from '@angular/router';
import { HttpService } from './fetch'
import html from './main.component.html'
import scss from './main.component.scss'

@Component({
  selector: 'app-main',
  template: `${html}`,
  styles: [`${scss}`]
})

export class MainComponent implements OnInit {
  public currentPathName:string
  public respData:string

  constructor(
    @Inject(Router) private router:Router,
    @Inject(HttpService) private httpService:HttpService
  ){}

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
    this.httpService.getPosts().subscribe(data => this.respData = JSON.stringify(data))
    this.router.events.subscribe(obj => {
      if(obj instanceof ActivationEnd){
        this.currentPathName = obj.snapshot.routeConfig.path
      }
    })
  }
}
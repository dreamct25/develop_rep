import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras,ActivationEnd } from '@angular/router';
import { HttpService } from './fetch'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public currentPathName:string
  public respData:string

  constructor(
    private router:Router,
    private httpService:HttpService
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
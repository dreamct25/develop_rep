import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import html from './pageI.container.html'
import scss from './pageI.container.scss'

@Component({
  selector: 'app-pageI',
  template: `${html}`,
  styles: [`${scss}`]
})

export class PageI implements OnInit {
  public routeParams:string = ""

  constructor(
    @Inject(ActivatedRoute) private route:ActivatedRoute,
  ){}

  ngOnInit(){
    this.route.queryParams.subscribe((queryParamMap:Params) => {
      this.routeParams = JSON.stringify(queryParamMap)
    })   
  }
}
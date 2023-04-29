import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pageI',
  templateUrl: './pageI.container.html',
  styleUrls: ['./pageI.container.scss']
})

export class PageI implements OnInit {
  public routeParams:string = ""

  constructor(private route:ActivatedRoute,private router:Router){}

  ngOnInit(){
    this.route.queryParams.subscribe((queryParamMap:Params) => {
      this.routeParams = JSON.stringify(queryParamMap)
    })   
  }
}
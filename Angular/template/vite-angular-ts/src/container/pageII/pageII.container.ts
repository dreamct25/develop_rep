import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pageII',
  templateUrl: './pageII.container.html',
  styleUrls: ['./pageII.container.scss']
})
export class PageII implements OnInit {
  public routeState:string = ""

  constructor(private router:Router){
    this.routeState = JSON.stringify(this.router.getCurrentNavigation().extras.state)
  }

  ngOnInit(){

  }
}
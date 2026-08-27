import { Component, ContentChild, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  public currentSingleName?: string | null

  public toggleCollect: boolean = false

  ngOnInit() {

  }
  ngDoCheck() {
    this.currentSingleName = sessionStorage.getItem("singleName")
  }
}

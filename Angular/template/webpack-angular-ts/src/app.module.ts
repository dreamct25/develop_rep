import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { MainComponent } from './component/main/main.component'
// import * as containerAssimble from './container'；

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
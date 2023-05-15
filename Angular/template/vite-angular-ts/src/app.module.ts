import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MainComponent } from './component/main/main.component'
import { PageIContainer,PageIIContainer } from './container'
import { HttpService } from './component/main/fetch'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageIContainer,
    PageIIContainer
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }
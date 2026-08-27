import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { RenderItemComponent } from './component/render-item/render-item.component';
import { GetDataService } from './service/getData.service';
import { PaginationComponent } from './component/pagination/pagination.component';
import { LoadingComponent } from './component/loading/loading.component';
import { SearchGroupComponent } from './component/search-group/search-group.component';
import { AlertModalComponent } from './component/alert-modal/alert-modal.component';
import { DetailsComponent } from './component/details/details.component';
import { PipePipe } from './Pipe/pipe.pipe'
import { LocaltionModalComponent } from './component/localtion-modal/localtion-modal.component';
import { CollectComponent } from './component/collect/collect.component';
import { InteractiveModalComponent } from './component/interactive-modal/interactive-modal.component';
import { FilterBoxComponent } from './component/filter-box/filter-box.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent,
    RenderItemComponent,
    PaginationComponent,
    LoadingComponent,
    SearchGroupComponent,
    AlertModalComponent,
    InteractiveModalComponent,
    LocaltionModalComponent,
    CollectComponent,
    FilterBoxComponent,
    PipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }







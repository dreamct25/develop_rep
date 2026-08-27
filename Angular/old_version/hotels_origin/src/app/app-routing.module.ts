import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './component/details/details.component';
import { MainComponent } from './component/main/main.component';

const routes: Routes = [{
  path: "",
  redirectTo: "/main",
  pathMatch: "full"
}, {
  path: "main",
  component: MainComponent
}, {
  path: "details",
  component: DetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

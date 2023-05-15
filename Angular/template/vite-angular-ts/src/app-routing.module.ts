import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageIContainer,PageIIContainer } from './container';
// import { Resovles } from './resovle/resovle'

const routes: Routes = [{
  path: "",
  redirectTo: "/pageI",
  pathMatch: "full"
}, {
  path: "pageI",
  title: `${document.title}-PageI`,
  component: PageIContainer
}, {
  path: "pageII",
  title: `${document.title}-PageII`,
  component: PageIIContainer
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  // providers: [Resovles]
})
export class AppRoutingModule { }

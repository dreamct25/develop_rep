import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageIContainer,PageIIContainer } from './container';

const routes: Routes = [{
  path: "",
  redirectTo: "/",
  pathMatch: "full"
}, 
{
  path: "pageI",
  title: `${document.title}-PageI`,
  component: PageIContainer
}, {
  path: "pageII",
  title: `${document.title}-PageII`,
  component: PageIIContainer
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

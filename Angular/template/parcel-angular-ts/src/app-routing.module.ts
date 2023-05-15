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
  component: PageIContainer
}, {
  path: "pageII",
  component: PageIIContainer
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

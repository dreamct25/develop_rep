import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PageI,PageII } from './container';
// import { Resovles } from './resovle/resovle'

const routes: Routes = [{
  path: "",
  redirectTo: "/",
  pathMatch: "full"
}, 
// {
//   path: "pageI",
//   title: `${document.title}-PageI`,
//   component: PageI
// }, {
//   path: "pageII",
//   title: `${document.title}-PageII`,
//   component: PageII
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  // providers: [Resovles]
})
export class AppRoutingModule { }

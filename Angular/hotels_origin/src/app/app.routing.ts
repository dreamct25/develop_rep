import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { 
//   MainComponent, 
//   DetailsComponent, 
//   Error404Component 
// } from '@/app/pages';

export default [
  {
    path: "",
    redirectTo: "/main",
    pathMatch: "full"
  }, {
    path: "main",
    loadComponent: async () => (await import('@/app/pages/main/main.component')).MainComponent
  }, {
    path: "details/:itemID",
    loadComponent: async () => (await import('@/app/pages/details/details.component')).DetailsComponent
  }, {
    path: "**",
    loadComponent: async () => (await import('@/app/pages/error404/error404.component')).Error404Component
  }
] as Routes

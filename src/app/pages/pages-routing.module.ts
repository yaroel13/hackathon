import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ROUTES, OTHER_ROUTES } from './pages.routes';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    ROUTES,
    OTHER_ROUTES
  ]
}];

@NgModule({
  imports: [
  	RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
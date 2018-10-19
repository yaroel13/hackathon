import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ROUTES, OTHER_ROUTES, MAINTENANCE_ROUTES } from './pages.routes';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    ROUTES.mainModule,
    ...ROUTES.subModules,
    ...OTHER_ROUTES,
    ...MAINTENANCE_ROUTES.subModules
  ]
}];

@NgModule({
  imports: [
  	RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
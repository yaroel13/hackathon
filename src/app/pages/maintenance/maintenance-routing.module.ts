import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ROUTES} from './maintenance.routes';

const routes = ROUTES;

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class MaintenanceRoutingModule { }

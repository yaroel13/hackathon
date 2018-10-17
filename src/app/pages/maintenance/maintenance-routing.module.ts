import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ROUTES} from './maintenance.routes';

const routes: Routes = [
  {
    path: 'maintenance',
    children: [...ROUTES]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }

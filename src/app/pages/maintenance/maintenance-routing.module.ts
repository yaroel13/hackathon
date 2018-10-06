import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import {ROUTES} from './maintenance.routes';

const routes: Routes = [
  {
    path: 'maintenance',
    children: [...ROUTES]
    // data: {
    //   icon: "view-dashboard",
    //   name: "DOCTOR MAINTENANCE"
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }

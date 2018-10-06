import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorComponent} from './doctor.component';


const routes: Routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
     data: {
      icon: "view-dashboard",
      name: "DOCTOR MAINTENANCE"
     }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

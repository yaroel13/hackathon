import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';

const routes:Routes = [{
  path:'',
  component:DoctorComponent
},
{
  path: ':code',
  component: DoctorComponent
}]

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DoctorRoutingModule { }

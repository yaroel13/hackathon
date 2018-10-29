import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '../../../global-modules';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ...MODULES
  ],
  declarations: [
    DoctorComponent,
    DoctorHeaderComponent,
    DoctorDetailComponent
  ]
})
export class DoctorModule { }

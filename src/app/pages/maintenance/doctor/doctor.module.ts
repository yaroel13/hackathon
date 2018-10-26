import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '../../../global-modules';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ...MODULES
  ],
  declarations: [DoctorComponent]
})
export class DoctorModule { }

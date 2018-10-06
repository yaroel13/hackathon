import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { MODULES } from '../../../global-modules';

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ...MODULES
  ],
  declarations: []
})
export class DoctorModule { }

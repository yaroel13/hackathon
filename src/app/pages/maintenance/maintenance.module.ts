import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MODULES } from '../../global-modules';

import { DoctorComponent } from './doctor/doctor.component';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ...MODULES
  ],
  declarations: [
    DoctorComponent
  ]
})
export class MaintenanceModule { }

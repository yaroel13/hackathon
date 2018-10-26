import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DoctorComponent} from './doctor/doctor.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MODULES } from 'src/app/global-modules';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ...MODULES
  ],
  declarations: []
})
export class MaintenanceModule { }

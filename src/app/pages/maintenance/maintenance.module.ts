import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DoctorComponent} from './doctor/doctor.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';

@NgModule({
  imports: [
    CommonModule,MaintenanceRoutingModule
  ],
  declarations: [DoctorComponent]
})
export class MaintenanceModule { }

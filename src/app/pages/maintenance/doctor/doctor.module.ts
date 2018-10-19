import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '../../../global-modules';

@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
  declarations: []
})
export class DoctorModule { }

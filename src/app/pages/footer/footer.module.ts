import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MODULES } from '../../global-modules';
@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [FooterComponent],

  declarations: [FooterComponent]
})
export class FooterModule {
  
 }

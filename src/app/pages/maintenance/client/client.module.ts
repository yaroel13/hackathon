import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { MODULES } from 'src/app/global-modules';
import { ProjectInvoiceComponent } from './project-invoice/project-invoice.component';
import { ProjectInvoiceFormComponent } from './project-invoice-form/project-invoice-form.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    ...MODULES
  ],
  declarations: [ClientComponent, ProjectInvoiceComponent, ProjectInvoiceFormComponent]
})
export class ClientModule { }

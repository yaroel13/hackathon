import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MODULES } from '../global-modules';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FooterModule } from './footer/footer.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    FooterModule,
    ...MODULES
  ],
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule {
  
 }

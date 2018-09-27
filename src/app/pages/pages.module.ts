import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatIconRegistry, MatTableModule } from '@angular/material';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { DoctorComponent } from './maintenance/doctor/doctor.component';
// import { MaintenanceRoutingModule } from './maintenance/maintenance-routing.module';
import { MODULES } from '../global-modules';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    // MaintenanceRoutingModule,
    ...MODULES
  ],
  declarations: [
    DashboardComponent,
    // DoctorComponent,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }

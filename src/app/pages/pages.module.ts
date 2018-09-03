import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatIconRegistry } from '@angular/material';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MODULES } from '../global-modules';

@NgModule({
  imports: [
    PagesRoutingModule,
    ...MODULES
  ],
  declarations: [
    DashboardComponent,
    PagesComponent
  ]
})
export class PagesModule { }

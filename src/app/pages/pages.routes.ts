import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DoctorComponent } from "./maintenance/doctor/doctor.component";



export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      icon: "view-dashboard",
      name: "DASHBOARD"
    }
  },
  {
    path: 'maintenance',
    data: {
      icon: "wrench",
      name: "MAINTENANCE"
    },
    loadChildren: "../maintenance/maintenance.module#MaintenanceModule"
  }];





export const OTHER_ROUTES: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    loadChildren: './account-settings/account-settings.module#AccountSettingsModule'
  }
]
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
  }
]

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: 'maintenance/doctor',
    component: DoctorComponent,
    data: {
      icon: "view-dashboard",
      name: "Doctor Maintenance"
    }
  }
]

export const OTHER_ROUTES: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    loadChildren: './account-settings/account-settings.module#AccountSettingsModule'
  }
]
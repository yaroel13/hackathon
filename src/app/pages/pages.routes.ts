import { DashboardComponent } from "./dashboard/dashboard.component";
import { DoctorComponent } from "./maintenance/doctor/doctor.component";
import { Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      icon: "view-dashboard",
      name: "DASHBOARD"
    }
  },
  {
    path: 'maintenance',
    // component: DoctorComponent,
    data: {
      icon: "view-dashboard",
      name: "MAINTENANCE"
    },
    loadChildren: './maintenance/maintenance.module#MaintenanceModule'
  }
]

// export const MAINTENANCE_ROUTES: Routes = [
//   {
//     path: 'maintenance/doctor',
//     component: DoctorComponent,
//     data: {
//       icon: "view-dashboard",
//       name: "DOCTOR MAINTENANCE"
//     }
//   }
// ]
export const OTHER_ROUTES: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    loadChildren: './account-settings/account-settings.module#AccountSettingsModule'
  }
]
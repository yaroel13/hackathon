import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

export const PAGES_ROUTES: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   data: {
  //     icon: "view-dashboard",
  //     name: "DASHBOARD"
  //   }
  // },
  {
    path: '',
    // component: DoctorComponent,
    data: {
      icon: "wrench",
      name: "MAINTENANCE"
    },
    loadChildren: "./maintenance/maintenance.module#MaintenanceModule"
  }];





export const OTHER_ROUTES: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent, 
    data: {
      icon:'account-circle',
      name: "ACCOUNT_SETTINGS"
    }
  }
]
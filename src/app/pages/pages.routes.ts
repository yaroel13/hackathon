import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

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

export const OTHER_ROUTES: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    loadChildren: './account-settings/account-settings.module#AccountSettingsModule'
  }
]
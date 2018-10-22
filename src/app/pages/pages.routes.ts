import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DoctorComponent } from "./maintenance/doctor/doctor.component";
import {NavigationItem} from "../model/navigation-item.model";
import {LanguageService} from "../services/language/language.service";


export const ROUTES: NavigationItem = 
  {
    mainModule:{
      path: '',
    component: DashboardComponent,
    data: {
      icon: "view-dashboard",
      name: "DASHBOARD"
    }
  },
  subModules:[]
  }


const MAINTENANCE_ROUTE = "maintenance";
export const MAINTENANCE_ROUTES: NavigationItem = 
  {
    mainModule:{
      path: '',
    data: {
      icon: "wrench",
      name: "MAINTENANCE"
    }
  },
  subModules:[{
    path: MAINTENANCE_ROUTE+"/doctor",
    component: DoctorComponent,
  data: {
    icon: "account",
    name: "DOCTOR"
  }},{
    path: MAINTENANCE_ROUTE+"/doctor",
    component: DoctorComponent,
  data: {
    icon: "account",
    name: "DOCTOR"
  }},{
    path: MAINTENANCE_ROUTE+"/doctor",
    component: DoctorComponent,
  data: {
    icon: "account",
    name: "DOCTOR"
  }},{
    path: MAINTENANCE_ROUTE+"/doctor",
    component: DoctorComponent,
  data: {
    icon: "account",
    name: "DOCTOR"
  }}]
  }



export const OTHER_ROUTES: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    loadChildren: './account-settings/account-settings.module#AccountSettingsModule'
  }
]
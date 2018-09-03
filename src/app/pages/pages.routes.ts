import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes } from "@angular/router";

export const CHILD_ROUTES: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {
    icon: "view-dashboard",
    name: "Dashboard"
  }  
}]
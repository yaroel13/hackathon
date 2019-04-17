
import { Routes } from "@angular/router";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    data: {
      icon: "",
      name: "USER"
    }
  }
];

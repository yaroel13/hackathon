
import { Routes } from "@angular/router";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  // {
  //   path: 'role',
  //   loadChildren: './role/role.module#RoleModule',
  //   data: {
  //     icon: "",
  //     name: "ROLE"
  //   }
  // },
  // {
  //   path: '',
  //   component: DoctorComponent,
  //   // data: {
  //   //   icon: "view-dashboard",
  //   //   name: "DOCTOR MAINTENANCE"
  //   // }
  // },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    data: {
      icon: "",
      name: "USER"
    }
  },
  // {
  //   path: 'doctor',
  //   loadChildren: './doctor/doctor.module#DoctorModule',
  //   data: {
  //     icon: "account",
  //     name: "DOCTOR"
  //   }
  // },
];

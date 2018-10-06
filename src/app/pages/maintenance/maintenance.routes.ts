
import { DoctorComponent } from "./doctor/doctor.component";
import { Routes } from "@angular/router";

export const ROUTES: Routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
    data: {
      icon: "view-dashboard",
      name: "Doctor Maintenance"
    }
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

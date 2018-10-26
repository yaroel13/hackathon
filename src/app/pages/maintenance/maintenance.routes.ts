
import { Routes } from "@angular/router";

export const MAINTENANCE_ROUTES: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'/'
    },
    {
        path: 'doctor',
        loadChildren:'./doctor/doctor.module#DoctorModule',
        data: {
            icon: "account",
            name: "DOCTOR"
        }
    }];

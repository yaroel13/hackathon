
import { Routes } from "@angular/router";
import {DoctorComponent} from './doctor/doctor.component';

export const ROUTES: Routes = [
    {
        path: 'doctor',
        component: DoctorComponent,
        data: {
            icon: "account",
            name: "DOCTOR"
        }
    }];

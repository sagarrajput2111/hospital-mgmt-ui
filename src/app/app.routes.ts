import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './home/patients/patients.component';
import { SigninComponent } from './signin/signin.component';
import { PatientListComponent } from './home/patients/patient-list/patient-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, children: [
            {
                path: 'patient-services', component: PatientsComponent, children: [
                    { path: 'all-patients', component: PatientListComponent },
                ]
            }
        ]
    },
    { path: 'signin', component: SigninComponent },
];

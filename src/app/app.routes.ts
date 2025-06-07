import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './home/patients/patients.component';
import { SigninComponent } from './signin/signin.component';
import { PatientListComponent } from './home/patients/patient-list/patient-list.component';
import { authGuard, loginGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { InvoicesComponent } from './home/patients/invoices/invoices.component';
import { ProfileComponent } from './home/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, canActivate: [authGuard], children: [
            {
                path: 'patient-services', component: PatientsComponent, children: [
                    { path: 'all-patients', component: PatientListComponent },
                ]
            },
            { path: 'finance', component: InvoicesComponent },
            { path: 'profile', component: ProfileComponent }


        ]
    },
    { path: 'signin', component: SigninComponent, canActivate: [loginGuard] },
    { path: 'non-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/non-found', pathMatch: 'full' },

];

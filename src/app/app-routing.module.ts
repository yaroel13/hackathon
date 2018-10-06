import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { GuestGuard } from './auth/guard/guest.guard';


export const routes: Routes = [
	{ 
		path: '',
		loadChildren: '../app/pages/pages.module#PagesModule',
		canActivate: [ AuthGuard ]
	},
	{ 
		path: '',
		loadChildren: '../app/pages/maintenance/maintenance.module#MaintenanceModule',
		canActivate: [ AuthGuard ]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [ GuestGuard ]
	},
	// {
	// 	path: 'register',
	// 	component: RegisterComponent,
	// 	canActivate: [ NoAuthGuard ]
	// },
	// {
	// 	path: 'forgot-password',
	// 	component: ForgotPasswordComponent,
	// 	canActivate: [ NoAuthGuard ]
	// },
	// {
	// 	path: 'reset-password',
	// 	component: ResetPasswordComponent,
	// 	canActivate: [ ]
	// },
	// {
	// 	path: 'verify',
	// 	component: VerificationComponent,
	// 	canActivate: [ ]
	// },
	{ 
		path: '**', 
		component: PageNotFoundComponent
	}
];


@NgModule({
  imports: [
  	RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

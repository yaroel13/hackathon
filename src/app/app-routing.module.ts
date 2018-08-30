import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';


export const routes: Routes = [
	{ 
		path: '',
		redirectTo: '/login',
		pathMatch: 'full' 
	},
	{
		path: 'login',
		component: LoginComponent,
		// canActivate: [ NoAuthGuard ]
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

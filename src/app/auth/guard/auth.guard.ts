import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
    public authService: AuthService, 
    public router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let isLoggedIn = this.authService.whenLoggedIn.getValue();

    if (!isLoggedIn){
      this.router.navigate(['/login']);
    }

    return !!isLoggedIn;
  }
}

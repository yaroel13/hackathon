import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

	constructor(
    public authService: AuthService, 
    public router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    let isLoggedIn = this.authService.whenLoggedIn.getValue();

    if (isLoggedIn){
      this.router.navigate(['/']);
    }

    return !isLoggedIn;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = new BehaviorSubject<boolean>(false);

  authenticate(){
    this.isLoggedIn.next(true);
  }

  logout(){
    this.isLoggedIn.next(false);
  }

  constructor() { }
}

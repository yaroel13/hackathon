import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { CHILD_ROUTES } from './pages.routes';

@Component({
  selector: 'esc-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public routes;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.routes = CHILD_ROUTES;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

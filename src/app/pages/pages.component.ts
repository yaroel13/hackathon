import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { PAGES_ROUTES } from './pages.routes';
import { MAINTENANCE_ROUTES } from './maintenance/maintenance.routes';
import * as _ from 'lodash';


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
    this.routes = PAGES_ROUTES;
    PAGES_ROUTES[1].children=MAINTENANCE_ROUTES;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

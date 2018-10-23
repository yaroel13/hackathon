import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { ROUTES, MAINTENANCE_ROUTES } from './pages.routes';
import * as _ from 'lodash';


@Component({
  selector: 'esc-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public navigations;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.navigations = [ROUTES,MAINTENANCE_ROUTES,ROUTES,MAINTENANCE_ROUTES,MAINTENANCE_ROUTES];
    console.log(this.navigations);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

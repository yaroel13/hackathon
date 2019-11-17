import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router, ActivatedRoute } from '@angular/router';
import { PAGES_ROUTES } from './pages.routes';
import { MAINTENANCE_ROUTES } from './maintenance/maintenance.routes';

@Component({
  selector: 'esc-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public routes;
  public otherRoutes;

  private firstChild;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.routes = ROUTES;
    this.getRoutes();
  }

  private getRoutes() {
    /**
     * Navigation Building
     */
    console.log('PAGESS',PAGES_ROUTES)
    let temp = PAGES_ROUTES.filter(r => {
      return r.data.name
    })
    this.routes = temp;

    PAGES_ROUTES[0].children = MAINTENANCE_ROUTES;
    // PAGES_ROUTES[2].children = REPORT_ROUTES;

    /**
     * Other Navigations Building
     */
    // this.otherRoutes = OTHER_ROUTES;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public getActiveModuleName()
  {
      this.firstChild = this.activeRouter.snapshot.firstChild;

      while(this.firstChild.firstChild)
      {
        this.firstChild = this.firstChild.firstChild;
      }

      return this.firstChild.data.name;
  }

}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAINTENANCE_ROUTES } from './maintenance.routes';

const routes = MAINTENANCE_ROUTES;

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class MaintenanceRoutingModule { }

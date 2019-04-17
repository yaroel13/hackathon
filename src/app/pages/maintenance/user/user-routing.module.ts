import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes:Routes = [
  {
    path: '**',
    // component: UserComponent
    component: UserListComponent
  }
]

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule { }

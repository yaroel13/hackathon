import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '../../../global-modules';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { DialogService } from '../../../services/dialog/dialog.service';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ...MODULES
  ],
  declarations: [
    UserComponent,
    UserHeaderComponent,
    UserDetailComponent,
    UserFormComponent,
    UserFilterComponent,
    UserListComponent
  ],
  entryComponents: [
    UserFilterComponent
  ],
  providers: [
    DialogService
  ]
})
export class UserModule { }

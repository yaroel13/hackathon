import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';
import { of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { UserFilterComponent } from '../user-filter/user-filter.component';
import { EmailInputComponent } from '../../../../utils/email-input/email-input.component';
import { DialogService, LanguageService } from '../../../../services';
import { UserService } from '../../../../services/entities';
import { REQUEST_DATA_WITH_OFFSET } from '../../../../utils/constant';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'esc-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(UserDetailComponent) userDetailComponent: UserDetailComponent;

  private url = "maintenance/user";
  public searchForm: FormGroup;

  public loading = {
    init: false,
    more: false
  };
  public listData = [];
  public listLength = 0;
  public selectedData;

  public filterNumber: number = 0;

  private tableData: any = {};
  // private tableData = Object.assign({}, REQUEST_DATA_WITH_OFFSET,
  //   {
  //     roles: [],
  //     status: "1",
  //   }
  // );
  // public filter = {
  //   roles: [],
  //   status: this.tableData.status,
  //   query: ""
  // };
  private currentFilter: any;

  constructor(
    public media: ObservableMedia,
    public userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    let requestData = _.cloneDeep(REQUEST_DATA_WITH_OFFSET)
    this.tableData = Object.assign({}, requestData, {
      filter: {
        status: "0",
      }
    }); //used cloneDeep on constant request data

    this.reRoute();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.reRoute());
    this.initForm();
    // this.patchForm();  removed patch form, applied patch on initForm
    this.getListData();
    this.subscribeSearch();
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchTerm: "",
    });
  }

  reRoute() {
    console.log(1)
    if (this.route.snapshot.url.length > 0) {
      let id = _.toNumber(this.route.snapshot.url[0].path);
      if (_.isNaN(id)) {
        this.router.navigate([this.url]);
      } else if (!this.selectedData || (this.selectedData.id != id)) {
        this.select({ id: id });
      }
    } else {
      this.selectedData = null;
      // this.emitData.emit(this.selectedData);
    }
  }

  getListData() {
    console.log(this.tableData);
    if (this.loading.init == true) {
      return;
    }
    if (this.listData.length == 0) {
      this.loading.init = true;
    }
    else {
      this.loading.more = true;
    }

    this.userService.getList(this.tableData).pipe(
      catchError((err) => {
        this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
        return observableOf(null);
      }))
      .subscribe((res: any) => {
        console.log(res);
        this.loading.init = false;
        this.loading.more = false;
        if(res && res.data) {
          this.listLength = _.toNumber(_.get(res.metadata, 'total'));
          this.listData = this.listData.concat(res.data);
        }
        else {
          this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
        }
      });
  }

  getMoreData() {
    if (!this.loading.more && !this.loading.init && this.listData.length < this.listLength) {
      this.tableData.page += 1;
      this.getListData();
    }
  }

  selectData(header) {
    if (!this.userDetailComponent.isEditMode) {
      this.router.navigate([this.url, header.id]);
      // this.selectedData = { id: header.id };
      // this.emitData.emit({ id: header.id });
    }
    else {
      this.dialogService.confirm({
        title: "Save Changes",
        message: "Do you want to save current changes?",
        button: "Yes",
        color: "warn",
        hasCancel: true
      }).subscribe(result => {
        if(result){
          console.log(result)
        }
      });
    }
  }

  select(data: any) {
    this.selectedData = data;
    // this.emitData.emit(data);
  }

  newData() {
    this.selectedData = {};
    // this.emitData.emit(this.selectedData);
  }

  refresh() {
    this.router.navigate([this.url]);
    this.selectedData = null;
    this.listData = [];
    this.getListData();
  }

  export() {
    this.dialogService.openDialog(EmailInputComponent, {
      width: "400px",
      autoFocus: true,
      disableClose: true,
      data: {
        email: localStorage.getItem('email')
      }
    })
      .afterClosed()
      .subscribe((email) => {
        if (email) {
          let requestData = {
            roles: this.tableData.roles,
            email: email
          }
          this.userService.export(requestData).pipe(
            catchError((err) => {
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT", {}));
              return observableOf(null);
            }))
            .subscribe((res: any) => {
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_REPORT_EMAIL", {}));
            });
        }
      });
  }

  subscribeSearch() {
    this.searchForm.controls['searchTerm'].valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      map((term: string) => _.trim(term)),
      distinctUntilChanged()
    ).subscribe((term) => {
      this.listData = [];
      this.tableData.page = REQUEST_DATA_WITH_OFFSET.page;
      this.tableData.query = _.toString(term);
      // this.filter.query = _.toString(term);
      this.getListData();
    });
  }

  openFilter() {
    let dialogRef: MatDialogRef<UserFilterComponent>;
    dialogRef = this.dialogService.openDialog(UserFilterComponent, {
      width: '500px',
      autoFocus: false,
      data: {
        filter: this.currentFilter
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data);
        this.currentFilter = _.cloneDeep(data);
        this.tableData.filter = {
          status: _.get(data, 'status') || "0"
        };
        // this.listData = data.resultData;
        // this.listLength = data.total;

        this.filterNumber = 0;

        if (this.tableData.filter.status && this.tableData.filter.status != "0") {
          this.filterNumber++;
        }

        this.getListData();
      }
    });
  }

}

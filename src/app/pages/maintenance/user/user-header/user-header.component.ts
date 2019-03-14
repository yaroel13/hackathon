import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { REQUEST_DATA } from '../../../../utils/constant';

@Component({
  selector: 'esc-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  @Output() emitData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public media: ObservableMedia,
    private dialogService: DialogService,
    private languageService: LanguageService,
    private fb: FormBuilder
  ) { }

  public searchForm: FormGroup;

  public error = {
    init: false
  }
  public loading = {
    init: false,
    more: false
  };
  public isEditMode: boolean = false;
  public listData = [];
  public listLength = 0;
  public selectedData;

  private tableData = Object.assign({}, REQUEST_DATA,
    {
      roles: null,
      status: "",
      fetchingData: false
    }
  );

  public filter: any = {
    roles: [],
    status: this.tableData.status,
    query: REQUEST_DATA.query
  };

  ngOnInit() {
    this.reRoute();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.reRoute());
    this.initForm();
    this.getListData();
    this.subscribeSearch();
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchTerm: [null],
    });
  }

  reRoute() {
    if (this.route.snapshot.url.length > 0) {
      let id = _.toNumber(this.route.snapshot.url[0].path);
      if (_.isNaN(id)) {
        this.router.navigate(['maintenance/user']);
      } else if (!this.selectedData || (this.selectedData.id != id)) {
        this.select({ id: id });
      }
    } else {
      this.selectedData = null;
    }
  }

  getListData() {
    if(this.loading.init == true){
      return;
    }
    this.error.init = false;
    if(this.listData.length == 0){
      this.loading.init = true;
    } else {
      this.loading.more = true;
    }
    this.userService.getList(this.tableData).pipe(
      catchError((err) => {
        if(this.listData.length == 0){
          this.error.init = true;
        } else {
          this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
        }
        return observableOf(null);
      }))
      .subscribe((res: any) => {
        // console.log(res);
        this.loading.init = false;
        this.loading.more = false;
        if (res == null) {
          return;
        } else if (res.code == 500)  {
          this.listData = [];
        }
        this.listLength = _.toNumber(_.get(res.metadata, 'total'));
        this.listData = this.listData.concat(res.data);
      });
  }

  getMoreData() {
    if(this.loading.more || this.loading.init || this.listData.length >= this.listLength){
      return;
    }
    this.tableData.page += 1;
    this.getListData();
  }

  selectData(header) {
    if(!this.isEditMode) {
      this.router.navigate(['maintenance/user', header.id]);
      this.selectedData = { id: header.id };
      this.emitData.emit({ id: header.id });
    }
  }

  select(data: any) {
    this.selectedData = data;
    this.emitData.emit(data);
  }

  newData() {
    this.selectedData = {};
    this.emitData.emit(this.selectedData);
  }

  refresh() {
    this.router.navigate(['maintenance/user']);
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
      if(email) {
        let requestData = {
          roles: this.tableData.roles,
          email: email
        }
        this.userService.export(requestData).pipe(
          catchError((err) => {
            if(this.listData.length == 0){
              this.error.init = true;
            } else {
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
            }
            return observableOf(null);
          }))
          .subscribe((res: any) => {
            this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_REPORT_EMAIL",{}));
          });
      }
    });
  }

  subscribeSearch() {
    this.searchForm.controls['searchTerm'].valueChanges.pipe(
      filter((term) => !_.isObject(term)),
      debounceTime(600),
      tap((term) => {
        // console.log("searchingQuery ", term);
      }),
      map((term: string) => _.trim(term)),
      distinctUntilChanged()
    ).subscribe((term) => {
      this.listData = [];
      this.tableData.page = REQUEST_DATA.page;
      this.tableData.query = _.toString(term);
      this.filter.query = _.toString(term);
      this.getListData();
    });
  }

  openFilter() {
    let dialogRef: MatDialogRef<UserFilterComponent>;
    dialogRef = this.dialogService.openDialog(UserFilterComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        filter: this.filter
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.filter = Object.assign({}, data.filter);
        this.listData = data.resultData;
        this.listLength = data.total;
        this.tableData.page = 1;
        this.tableData.roles = data.filter.roles ? _.map(data.filter.roles, 'id') as number[] : null;
        this.tableData.status = data.filter.status;
        this.tableData.fetchingData = false;
      }
    });
  }

}

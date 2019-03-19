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

  private url = "maintenance/user";
  public searchForm: FormGroup;

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
      roles: [],
      status: "1",
    }
  );
  public filter = {
    roles: [],
    status: this.tableData.status,
    query: ""
  };

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
    this.reRoute();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.reRoute());
    this.initForm();
    this.patchForm();
    this.getListData();
    this.subscribeSearch();
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchTerm: [null],
    });
  }

  patchForm() {
    this.searchForm.patchValue({
      searchTerm: ""
    });
  }

  reRoute() {
    if (this.route.snapshot.url.length > 0) {
      let id = _.toNumber(this.route.snapshot.url[0].path);
      if (_.isNaN(id)) {
        this.router.navigate([this.url]);
      } else if (!this.selectedData || (this.selectedData.id != id)) {
        this.select({ id: id });
      }
    } else {
      this.selectedData = null;
    }
  }

  getListData() {
    if(this.loading.init == true) {
      return;
    }
    if(this.listData.length == 0) {
      this.loading.init = true;
    }
    else {
      this.loading.more = true;
    }
    this.listData = [
      {
        id: 1,
        name: "Jerica",
        code: "JEC",
        email: "jerica.l@electronicscience.com",
        status: 1
      },
      {
        id: 2,
        name: "Jerome",
        code: "JEROME",
        email: "jerome.p@electronicscience.com",
        status: 1
      },
      {
        id: 3,
        name: "Allan",
        code: "ALLAN",
        email: "allan.d@electronicscience.com",
        status: 1
      },
      {
        id: 4,
        name: "Alonzo",
        code: "ZOE",
        email: "alonzo.m@electronicscience.com",
        status: 1
      },
      {
        id: 5,
        name: "Lielle",
        code: "LIELLE",
        email: "lielle.b@electronicscience.com",
        status: 1
      }
    ]
    this.listLength = 5;
    this.loading.init = false;

    // this.userService.getList(this.tableData).pipe(
    //   catchError((err) => {
    //     this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
    //     return observableOf(null);
    //   }))
    //   .subscribe((res: any) => {
    //     // console.log(res);
    //     this.loading.init = false;
    //     this.loading.more = false;
    //     if(res && res.data) {
    //       this.listLength = _.toNumber(_.get(res.metadata, 'total'));
    //       this.listData = this.listData.concat(res.data);
    //     }
    //     else {
    //       this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
    //     }
    //   });
  }

  getMoreData() {
    if(!this.loading.more && !this.loading.init && this.listData.length < this.listLength) {
      this.tableData.page += 1;
      this.getListData();
    }
  }

  selectData(header) {
    if(!this.isEditMode) {
      this.router.navigate([this.url, header.id]);
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
      if(email) {
        let requestData = {
          roles: this.tableData.roles,
          email: email
        }
        this.userService.export(requestData).pipe(
          catchError((err) => {
            this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
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
        this.filter = _.cloneDeep(data.filter);
        this.tableData = _.cloneDeep(data.tableData);
        this.listData = data.resultData;
        this.listLength = data.total;
      }
    });
  }
}
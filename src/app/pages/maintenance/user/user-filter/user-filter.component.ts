import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import * as _ from 'lodash';
import { of as observableOf } from 'rxjs';
import { tap, catchError, debounceTime, map, distinctUntilChanged, finalize, switchMap, retry } from 'rxjs/operators';
import { DialogService, LanguageService } from '../../../../services';
import { UserService } from '../../../../services/entities';

@Component({
  selector: 'esc-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  @ViewChild('roleSearch') roleSearch;
  roleSearchResult: any[] = [];
  roles: any[] = [];

  loading = {
    searchRole: false
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFilterComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialogService: DialogService,
    private languageService: LanguageService
  ) { }

  filterForm: FormGroup;

  ngOnInit() {
    this.filterForm = this.fb.group({
      role: [],
      status: []
    });

    this.filterForm.patchValue({
      role: "",
      status: this.data && this.data.filter ? this.data.filter.status : null
    });
    this.roles = this.data.filter.roles;
  }

  reset() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      status: ""
    });
    this.roles = [];
  }

  getValue() {
    let filter = this.filterForm.value;
    filter.roles = this.roles;
    filter.query = this.data.filter.query;

    let filterData = {
      limit: 20,
      page: 1,
      roles: filter.roles ? _.map(filter.roles, 'id') as number[] : null,
      status: filter.status,
      query: filter.query
    };
    this.userService.getList(filterData).pipe(
      catchError((err) => {
        this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
        return observableOf(null);
      }))
      .subscribe((res: any) => {
        let total = _.toNumber(_.get(res.metadata, 'total'));
        if(total == 0) {
          this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_NO_RESULT_FOUND",{}));
        }
        else {
          this.dialogRef.close({
            filter: filter,
            resultData: res.data,
            total: total
          });
        }
      });
  }
}
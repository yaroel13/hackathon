import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import * as _ from 'lodash';
import { of as observableOf, fromEvent } from 'rxjs';
import { tap, catchError, debounceTime, map, distinctUntilChanged, finalize, switchMap, retry, takeUntil } from 'rxjs/operators';
import { DialogService, LanguageService } from '../../../../services';
import { UserService } from '../../../../services/entities';

const REQUEST_DATA = {
  offset: 0,
  limit: 20,
  getMore: true,
  query: ""
}

@Component({
  selector: 'esc-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  // @ViewChild('roleSearch') roleSearch;
  // roleSearchResult: any[] = [];
  // roles: any[] = [];

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
  private filters: any;

  ngOnInit() {
    this.filters = _.clone(REQUEST_DATA)
    this.filterForm = this.fb.group({
      // role: [],
      status: this.data && this.data.filter ? this.data.filter.status : null
    });

    // this.subscribeSearch();
    // this.roles = this.data.filter.roles;
  }

  // getInitialFilterValues(filterName, acTrigger) {
  //   this.clearList(filterName);
  //   this.filters = _.cloneDeep(REQUEST_DATA);
  //   this.getData(filterName);
  // }

  // getMoreData(name) {
  //   if (this.filters.getMore) {
  //     this.filters.offset += REQUEST_DATA.offset;
  //     this.getData(name);
  //   }
  // }

  // clearList(name) {
  //   let filterOptionList = name + "Options";
  //   this[filterOptionList] = [];
  // }

  reset() {
    this.filterForm.reset();
    // this.filterForm.patchValue({
    //   status: ""
    // });
    // this.roles = [];
  }

  // resetOption(evt: MouseEvent, filterName) {
  //   switch (filterName) {
  //     case "role":
  //       this.filterForm.patchValue({
  //         role: initialOptionValue
  //       }, { emitEvent: false });
  //       break;
  //   }
  //   evt.stopPropagation();
  // }

  // checkAutocompleteObject(objectKey: string) {
  //   if ((!_.isObject(this.filterForm.controls[objectKey].value) || !this.filterForm.controls[objectKey].value.id) && this.filterForm.controls[objectKey].value != null) {
  //     this.filterForm.controls[objectKey].setErrors({
  //       "notExisting": true
  //     });
  //   }
  // }

  getData() {
    let filters = this.filters;
    this.filters.getMore = false;

    switch (name) {
      case "role": {
        this.loading.searchRole = true
        this.userService.getList(filters).pipe(
          catchError((err) => {
            console.error(err);
            this.loading.searchRole = false;
            this.dialogService.openSnackBar("Error loading data, please try again later");
            return observableOf(null);
          }))
          .subscribe((res: any) => {
            console.log(res);
            this.loading.searchRole = false;
            if (res == null) {
              return;
            }
            if (res.responseData) {
              // this.roles = this.roles.concat(res.responseData);
            }
            if (res && res.token) {
              localStorage.setItem("token", res.token);
            }
            if (res.status == 0 || res.status == 504 || res.status == 500) {
              // this.dialogService.openSnackBar(this.networkErrMsg)
            }
            if (res.responseData.length > 0) {
              this.filters.getMore = true;
              // this.autocompleteScroll('consolidator', 'consolidatorAutoCompleteRef', 'consolidatorAutoCompleteTr');
            }
          });
        break;
      }
    }

    // filter.roles = this.roles;
    // filter.query = this.data.filter.query;

    // let filterData = {
    //   limit: 20,
    //   page: 1,
    //   roles: filter.roles ? _.map(filter.roles, 'id') as number[] : null,
    //   status: filter.status,
    //   query: filter.query
    // };
    // this.userService.getList(filterData).pipe(
    //   catchError((err) => {
    //     this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT", {}));
    //     return observableOf(null);
    //   }))
    //   .subscribe((res: any) => {
    //     let total = _.toNumber(_.get(res.metadata, 'total'));
    //     if (total == 0) {
    //       this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_NO_RESULT_FOUND", {}));
    //     }
    //     else {
    //       this.dialogRef.close({
    //         filter: filter,
    //         resultData: res.data,
    //         total: total
    //       });
    //     }
    //   });
  }

  // autocompleteScroll(name, refName, acTrigger) {
  //   setTimeout(() => {
  //     if (this[refName].isOpen || this[refName].panel) {
  //       fromEvent(this[refName].panel.nativeElement, 'scroll')
  //         .pipe(
  //           map(x => this[refName].panel.nativeElement.scrollTop),
  //           takeUntil(this[acTrigger].panelClosingActions)
  //         )
  //         .subscribe(x => {
  //           const scrollTop = this[refName].panel.nativeElement
  //             .scrollTop;
  //           const scrollHeight = this[refName].panel.nativeElement
  //             .scrollHeight;
  //           const elementHeight = this[refName].panel.nativeElement
  //             .clientHeight;
  //           const atBottom = scrollHeight === scrollTop + elementHeight;
  //           if (atBottom) {
  //             // fetch more data
  //             this.getMoreData(name);
  //           }
  //         });
  //     }
  //   });
  // }

  getValue() {
    let filter = this.filterForm.value;
    return filter;
  }
}
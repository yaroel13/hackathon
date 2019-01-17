import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import * as _ from 'lodash';
import { of as observableOf, fromEvent } from 'rxjs';
import { distinctUntilChanged, catchError, retry, switchMap, finalize, map, debounceTime, tap, takeUntil } from 'rxjs/operators';
import { UserDetailComponent } from '../user-detail/user-detail.component';
// import { SecurityMatrixService } from '../../../security-matrix/security-matrix.service';
import { DialogService, LanguageService } from '../../../../services';
// import { PrincipalService, UserService } from '../../../../services/entities';
import { UserService } from '../../../../services/entities';

@Component({
  selector: 'esc-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() selectedData: any;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onFormSubmit = new EventEmitter<any>();

  // @ViewChild('principalAC') principalACRef: MatAutocomplete;
  // @ViewChild(MatAutocompleteTrigger) principalACTr: MatAutocompleteTrigger;

  // @ViewChild('roleAC') roleACRef: MatAutocomplete;
  // @ViewChild(MatAutocompleteTrigger) roleACTr: MatAutocompleteTrigger;

  constructor(
    private fb: FormBuilder,
    @Inject(UserDetailComponent) private parent: UserDetailComponent,
    // private principalService: PrincipalService,
    private userService: UserService,
    // private securityMatrixService: SecurityMatrixService,
    private dialogService: DialogService,
    private languageService: LanguageService
  ) { }

  public form: FormGroup;

  public principalOptions = [];
  public principalOptionsLength = 0;
  public roleOptions = [];
  public roleOptionsLength = 0;
  private initialPage = 1;
  private incrementsOf = 20;
  private initialKeyword = "";

  public filterLists = {
    principal: {
      limit: this.incrementsOf,
      page: this.initialPage,
      query: this.initialKeyword,
      fetchingData: false
    },
    role: {
      limit: this.incrementsOf,
      page: this.initialPage,
      query: this.initialKeyword,
      fetchingData: false
    }
  }

  public loading = {
    principalSearch: false,
    roleSearch: false
  }

  ngOnInit() {
    this.initForm();
    this.patchForm();
    this.subscribeSearch();
  }

  initForm() {
    this.form = this.fb.group({
      principal: [null, [Validators.required]],
      preferred_username: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      name: [null, [Validators.required, Validators.maxLength(200)]],
      role: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9@._]*$/)]],
      imei: [null, [Validators.maxLength(15), Validators.pattern(/^[0-9]*$/)]],
      status: ''
    });
  }

  patchForm() {
    this.form.patchValue({
      principal: "",
      preferred_username: "",
      name: "",
      role: "",
      email: "",
      imei: "",
      status: "",
    });

    if (this.selectedData.id) {
      let selectedDataDetail: any = this.selectedData;
      this.form.patchValue(selectedDataDetail);
      this.form.patchValue({
        status: selectedDataDetail.status == 1 ? true : false
      });
      this.form.controls["preferred_username"].disable();
    } else {
      this.form.patchValue({
        status: true
      });
    }
  }

  getInitialOptionValues(name, acTrigger) {
    if (!this.form.controls[name].value) {
      this.filterLists[name].limit = this.incrementsOf;
      this.filterLists[name].page = this.initialPage;
      this.getData(name);
    } else {
      this[acTrigger].openPanel();
    }
  }

  getData(name) {
    switch(name) {
      // case "principal": {
      //   this.loading.principalSearch = true;
      //   this.principalService.getList(this.filterLists[name]).pipe(
      //     catchError((err) => {
      //       console.error(err);
      //       return observableOf(null);
      //     }))
      //     .subscribe((res: any) => {
      //       if (res == null) {
      //         return;
      //       }
      //       // console.log(res)
      //       this.principalOptionsLength = _.toNumber(_.get(res.metadata, 'total'));
      //       this.principalOptions = res.data;
      //       this.filterLists[name].fetchingData = false;
      //       this.autocompleteScroll('principal', 'principalACRef', 'principalACTr');
      //       this.loading.principalSearch = false;
      //     });
      //   break;
      // }

      // case "role": {
      //   this.loading.roleSearch = true;
      //   this.securityMatrixService.getList(this.filterLists[name]).pipe(
      //     catchError((err) => {
      //       console.error(err);
      //       return observableOf(null);
      //     }))
      //     .subscribe((res: any) => {
      //       if (res == null) {
      //         return;
      //       }
      //       // console.log(res)
      //       this.roleOptionsLength = _.toNumber(_.get(res.metadata, 'total'));
      //       this.roleOptions = res.data;
      //       this.filterLists[name].fetchingData = false;
      //       this.autocompleteScroll('role', 'roleACRef', 'roleACTr');
      //       this.loading.roleSearch = false;
      //     });
      //   break;
      // }

      default: {
        break;
      }
    }
  }

  getMoreData(name) {
    switch(name) {
      // case "principal": {
      //   if (!this.loading.principalSearch && this.principalOptionsLength > this.principalOptions.length) {
      //     this.filterLists[name].limit = this.incrementsOf;
      //     this.filterLists[name].page += 1;
      //     this.getData(name);
      //   }
      //   break;
      // }

      // case "role": {
      //   if (!this.loading.roleSearch && this.roleOptionsLength > this.roleOptions.length) {
      //     this.filterLists[name].limit = this.incrementsOf;
      //     this.filterLists[name].page += 1;
      //     this.getData(name);
      //   }
      //   break;
      // }

      default: {
        break;
      }
    }
  }

  subscribeSearch() {
    // this.form.controls['role'].valueChanges.pipe(
    //   tap((term) => {
    //     if (!(typeof term === 'string' || term instanceof String)) {
    //       throw "Invalid format";
    //     }
    //     this.filterLists['role'].page = this.initialPage;
    //     this.filterLists['role'].query = this.form.controls['role'].value;
    //   }),
    //   debounceTime(600),
    //   map((term: string) => _.trim(term)),
    //   distinctUntilChanged(),
    //   switchMap((term) => term ?
    //     this.securityMatrixService.getList({
    //       page: this.initialPage,
    //       query: term
    //     }) :
    //     observableOf(null)
    //   ),
    //   retry(-1),
    //   catchError((err) => {
    //     console.error(err);
    //     return observableOf(null);
    //   }))
    //   .subscribe((res: any) => {
    //     // console.log(res);
    //     if (res == null) {
    //       return;
    //     } else {
    //       this.roleOptions = res.data;
    //     }
    //   });

    // this.form.controls['principal'].valueChanges.pipe(
    //   tap((term) => {
    //     if (!(typeof term === 'string' || term instanceof String)) {
    //       throw "Invalid format";
    //     }
    //     this.filterLists['principal'].page = this.initialPage;
    //     this.filterLists['principal'].query = this.form.controls['principal'].value;
    //   }),
    //   debounceTime(600),
    //   map((term: string) => _.trim(term)),
    //   distinctUntilChanged(),
    //   switchMap((term) => term ?
    //     this.principalService.getList({
    //       page: this.initialPage,
    //       query: term
    //     }) :
    //     observableOf(null)
    //   ),
    //   retry(-1),
    //   catchError((err) => {
    //     console.error(err);
    //     return observableOf(null);
    //   }))
    //   .subscribe((res: any) => {
    //     // console.log(res);
    //     if (res == null) {
    //       return;
    //     } else {
    //       this.principalOptions = res.data;
    //     }
    //   });
  }

  autocompleteScroll(name, refName, acTrigger) {
    setTimeout(() => {
      if (this[refName].isOpen || this[refName].panel) {
        fromEvent(this[refName].panel.nativeElement, 'scroll')
          .pipe(
            map(x => this[refName].panel.nativeElement.scrollTop),
            takeUntil(this[acTrigger].panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this[refName].panel.nativeElement
              .scrollTop;
            const scrollHeight = this[refName].panel.nativeElement
              .scrollHeight;
            const elementHeight = this[refName].panel.nativeElement
              .clientHeight;
            const atBottom = scrollHeight === scrollTop + elementHeight;
            if (atBottom) {
              // fetch more data
              this.getMoreData(name);
            }
          });
      }
    });
  }

  autoCmpltClosed(name) {
    if (!this.form.controls[name].value) {
      this.filterLists[name].list = [];
    }
  }

  close() {
    this.onClose.emit(true);
  }

  onSubmit(value) {
    if(this.form.valid) {
      this.form.disable();
      let formValue = {
        "id": this.selectedData.id ? this.selectedData.id : null,
        "principal_id": value.principal.id ? value.principal.id : null,
        "preferred_username": value.preferred_username ? value.preferred_username : null,
        "name": value.name ? value.name : null,
        "role_id": value.role.id ? value.role.id : null,
        "email": value.email ? value.email : null,
        "imei": value.imei ? value.imei : null,
        "status": value.status ? value.status : null,
        "temporary_password": "Star123!"
      }
      if (this.selectedData.id) {
        formValue["status"] = formValue.status == true ? 1 : 0;
        this.userService.update(formValue).pipe(
          finalize(() => {
            // this.loading.submit = false;
          }))
          .subscribe(
            (res: any) => {
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_SUCCESS_UPDATE",{}));
              this.onFormSubmit.emit(true);
              this.parent.userDetail = formValue;
              this.parent.updateHeader();
            },
            (err) => this.handleError(err, true)
          )
      } else {
        formValue["status"] = 1;
        this.userService.add(formValue).pipe(
          finalize(() => {
            // this.loading.submit = false;
          }))
          .subscribe(
            (res: any) => {
              // console.log(res);
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_SUCCESS_ADD",{}));
              this.onFormSubmit.emit(true);

              this.parent.userDetail = formValue;
              this.parent.userDetail.id = res.data.id;
              this.parent.selectedData.id = res.data.id;
              this.parent.addToHeader();
            },
            (err) => this.handleError(err, false)
          )
      }
    }
  }

  handleError(err, isForUpdate) {
    this.form.enable();
    if(isForUpdate) {
      this.form.controls["preferred_username"].disable();
    }

    console.log(err);
    let message = this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{});
    try {
      let _err = err.error.result.failed;
      let duplicateErr = _.find(_err, {'code': 'ERR002'});
      if(duplicateErr) {
        let data = duplicateErr['data'][0]['params'];
        for(var i in data) {
          this.form.get(data[i]).setErrors({
            notUnique: true
          });
        }
      }
      message = this.languageService.getTranslation("MESSAGE_ERROR_SAVING_DATA",{});
    } catch (err) { }
    if (message) {
      this.dialogService.openSnackBar(message);
    }
  }

  displayFn(data?: any): string | undefined {
    return data ? data.name : null;
  }

}

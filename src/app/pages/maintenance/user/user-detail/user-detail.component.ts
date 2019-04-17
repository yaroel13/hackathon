import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { of as observableOf, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { DialogService, LanguageService, HelperService } from '../../../../services';
import { UserService } from '../../../../services/entities';

@Component({
  selector: 'esc-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() header: UserHeaderComponent;
  @Input() selectedData: any;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(
    public dialogService: DialogService,
    private languageService: LanguageService,
    public userService: UserService,
    public route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService
  ) { }

  private getDetailSub: Subscription;
  public userDetail: any;
  public error: any = {}
  public loading: any = {
    detail: false
  }
  public isEditMode: boolean = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("detail", changes.selectedData)
    if (changes.selectedData) {
      if (this.selectedData && this.selectedData.id) {
        if (!changes.selectedData.previousValue || (changes.selectedData.previousValue && changes.selectedData.previousValue.id !== this.selectedData.id)) {
          this.getDetail();
        }
      }
      else if (this.selectedData) {
        this.add();
      }
      else {
        this.userDetail = null;
      }
    }
  }

  getDetail() {
    this.loading.detail = true;
    let temp = {
      "id": this.selectedData.id
    };
    this.getDetailSub = this.userService.getDetail(temp).pipe(
      catchError((err) => {
        console.error(err);
        return observableOf(null);
      }),
      finalize(() => {
        this.loading.detail = false;
        this.getDetailSub.unsubscribe();
      }))
      .subscribe((res: any) => {
        console.log(res);
        if(res && res.data) {
          this.userDetail = _.cloneDeep(res.data);
        }
        else {
          this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{}));
        }
        // let detail = res.data;
        // this.userDetail = this.helperService.convertToLocalDatetime([detail])[0];
      });
  }

  add() {
    this.userDetail = {};
    this.router.navigate(['maintenance/user']);
    this.header.isEditMode = true;
  }

  close() {
    this.router.navigate(['maintenance/user']);
    this.header.isEditMode = false;
    this.userDetail = undefined;
    this.onClose.emit(true);
  }

  edit() {
    this.header.isEditMode = true;
  }

  onFormClose(event) {
    if (this.userDetail.id) {
      this.header.isEditMode = false;
    } else {
      this.close();
    }
  }

  resetPassword() {
    this.dialogService.confirm({
      title: "Reset Password",
      message: "Are you sure you want to reset the password of this user?",
      button: "Reset",
      color: "warn",
      hasCancel: true
    }).subscribe(result => {
      if(result){
        this.loading.resetPassword = true;
        let data = {
          id: this.userDetail.id,
          temporary_password: "Pass123!"
        }
        let request = this.userService.resetPassword(data);

        request.pipe(
          finalize(() => {
            this.loading.resetPassword = false;
          }))
          .subscribe(
            (data) => {
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_PASSWORD_RESET",{}));
              this.getDetail();
            },
            (err) => {
              console.log(err);
              let message = this.languageService.getTranslation("MESSAGE_ERROR_DEFAULT",{});
              try {
                let _err = JSON.parse(err._body);
                message = _err.message;
              } catch(err) { }
              this.dialogService.openSnackBar(message);
            }
          )
      }
    });
  }

  updateHeader() {
    var index = _.findIndex(this.header.listData, {id: this.userDetail.id});
    this.header.listData.splice(index, 1, this.userDetail);
    this.header.isEditMode = false;
    this.getDetail();
  }

  addToHeader() {
    this.header.listData.unshift(this.userDetail);
    this.header.listLength = this.header.listLength + 1;
    this.header.isEditMode = false;
    this.getDetail();
  }
}

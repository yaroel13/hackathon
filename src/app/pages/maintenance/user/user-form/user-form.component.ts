import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { DialogService, LanguageService } from '../../../../services';
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

  constructor(
    private fb: FormBuilder,
    @Inject(UserDetailComponent) private parent: UserDetailComponent,
    private userService: UserService,
    private dialogService: DialogService,
    private languageService: LanguageService
  ) { }

  public form: FormGroup;

  ngOnInit() {
    this.initForm();
    this.patchForm();
  }

  initForm() {
    this.form = this.fb.group({
      code: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      name: [null, [Validators.required, Validators.maxLength(200)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9@._]*$/)]],
      status: ''
    });
  }

  patchForm() {
    this.form.patchValue({
      code: "",
      name: "",
      email: "",
      status: "",
    });

    if (this.selectedData.id) {
      let selectedDataDetail: any = this.selectedData;
      this.form.patchValue(selectedDataDetail);
      this.form.patchValue({
        status: selectedDataDetail.status == 1 ? true : false
      });
      this.form.controls["code"].disable();
    } else {
      this.form.patchValue({
        status: true
      });
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
        "code": value.code ? value.code : null,
        "name": value.name ? value.name : null,
        "email": value.email ? value.email : null,
        "status": value.status ? value.status : null
      }
      if (this.selectedData.id) {
        formValue["status"] = formValue.status == true ? 1 : 0;
        this.userService.update(formValue).pipe(
          finalize(() => {
            // this.loading.submit = false;
          }))
          .subscribe(
            () => {
              this.dialogService.openSnackBar(this.languageService.getTranslation("MESSAGE_INFO_SUCCESS_UPDATE", {}));
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
      this.form.controls["code"].disable();
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

}

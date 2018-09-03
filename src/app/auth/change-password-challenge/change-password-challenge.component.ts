import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidator } from '../../utils/password-validator';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'esc-change-password-challenge',
  templateUrl: './change-password-challenge.component.html',
  styleUrls: ['./change-password-challenge.component.scss']
})
export class ChangePasswordChallengeComponent implements OnInit {

  public show: any = {
    confirm: false,
    password: false
  }
  public updatePasswordForm : FormGroup;

  constructor(
    private fb: FormBuilder,
  	public dialogRef: MatDialogRef<ChangePasswordChallengeComponent>
  ){ }

  ngOnInit() {
    this.updatePasswordForm = this.fb.group({
      password: [null, 
        Validators.compose([
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(60), 
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.\[\]{}()?\-\"!@#%&/\\,><':;|_~`])[A-Za-z\d\^$*.\[\]{}()?\-\"!@#%&/\\,><':;|_~`]{0,}/)
        ])
      ],
      confirmPassword: [null, Validators.required]
    }, {
      validator: PasswordValidator.matchPassword
    });
  }

}


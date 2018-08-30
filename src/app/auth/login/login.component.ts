import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services';
import * as _ from 'lodash';
// import { ChangePasswordChallengeComponent } from '../change-password-challenge/change-password-challenge.component';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

@Component({
  selector: 'esc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isPasswordShown: boolean;
  public isLoading : boolean;
  public loginForm : FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService
  ){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if(params['username']){
        this.loginForm.controls['username'].setValue(params['username']);
      }
    });
  }

  onSubmit(value: any){
    this.isLoading = true;
    this.authService.authenticate();
  }
}

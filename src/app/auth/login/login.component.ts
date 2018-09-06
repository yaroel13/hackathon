import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services';
import { environment } from './../../../environments/environment';
// import { ChangePasswordChallengeComponent } from '../change-password-challenge/change-password-challenge.component';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config, CognitoIdentityCredentials, CognitoIdentityServiceProvider } from 'aws-sdk'
import { DialogService } from '../../services/dialog/dialog.service';
import { ChangePasswordChallengeComponent } from '../change-password-challenge/change-password-challenge.component';
import { COGNITO_ERROR_NOT_AUTHORIZED_EXCEPTION, COGNITO_ERROR_PASSWORDRESET_REQUIRED_EXCEPTION, COGNITO_ERROR_USER_NOT_CONFIRMED_EXCEPTION, COGNITO_ERROR_USER_NOT_FOUND_EXCEPTION } from '../../utils/constant';

@Component({
  selector: 'esc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isPasswordShown: boolean;
  public isSubmitting : boolean;
  public loginForm : FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private dialogService: DialogService,
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
 
    this.isSubmitting = true;
    this.loginForm.disable();

    let authenticationDetails = new AuthenticationDetails({
      Username: value.username,
      Password: value.password
    });
    
    let cognitoUser = new CognitoUser({
      Username : value.username,
      Pool : this.authService.userPool      
    });
    
    let self = this;

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (session) {
        self.authService.initAWSCredentials();
        self.router.navigate(['/']);
      },
      onFailure: function (err) {
        console.log(err);
        self.isSubmitting = false;
        self.loginForm.enable();

        switch(err.name){
          case COGNITO_ERROR_NOT_AUTHORIZED_EXCEPTION:
          case COGNITO_ERROR_USER_NOT_FOUND_EXCEPTION:
            self.dialogService.openSnackBar("Incorrect Username/Password");
            break;
          case COGNITO_ERROR_PASSWORDRESET_REQUIRED_EXCEPTION:
            // TODO: SEND_RESET_PASSWORD_REQUIRED
            // TODO: ERROR_MESSAGE_ABOVE
            self.dialogService.openSnackBar("Password Reset Required. Please check your email for the instruction.");
            break;
          case COGNITO_ERROR_USER_NOT_CONFIRMED_EXCEPTION:
            // TODO: ERROR_MESSAGE_ABOVE
            self.dialogService.openSnackBar("Please check your email for your account verification");
            break;
          default: 
          // TODO: ERROR_MESSAGE_ABOVE
            self.dialogService.openSnackBar("An error occurred. Please Try Again.");
        }
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        self.isSubmitting = false;

        delete userAttributes.phone_number_verified;
        delete userAttributes.email_verified;
        self.dialogService.openDialog(ChangePasswordChallengeComponent, { 
            width: "400px", 
            autoFocus: true,  
            disableClose: true, 
            data: {
              session: this
            }
          })
          .afterClosed()
          .subscribe((password) => {
            self.isSubmitting = true;
            cognitoUser.completeNewPasswordChallenge(password, userAttributes, this);
          });
      }
    })
  }
}

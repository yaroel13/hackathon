import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CognitoUserPool, CognitoUserSession, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials, config } from 'aws-sdk';
import { User } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _whenLoggedIn = new BehaviorSubject<User>(null);
  private _userPool: CognitoUserPool;
  private _user: User;

  get whenLoggedIn(){ return this._whenLoggedIn };
  get user(){ return this._user }
  get userPool(){ return this._userPool }

  constructor() {
    this._userPool = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    });
    
    this.initAWSCredentials();
  }

  private setUser(user: User){
    this._user = user
    this._whenLoggedIn.next(user);
  }


  public initAWSCredentials(){
    let cognitoUser = this.userPool.getCurrentUser();
    console.log(cognitoUser)

    if(!cognitoUser){
      return;
    }

    this.setUser(new User(cognitoUser));

    cognitoUser.getSession(async (err, session: CognitoUserSession) => {
      if(err){
        return console.log(err);
      }
      let logins = {
        [environment.cognitoIdentityEndpoint]: session.getIdToken().getJwtToken()
      };
  
      let creds = new CognitoIdentityCredentials({
        IdentityPoolId: environment.cognitoIdentityPoolId,
        Logins: logins
      },{
        region: environment.region
      });
  
      config.credentials = creds;

      await ((config.credentials) as CognitoIdentityCredentials).refreshPromise();
    });
  }

  public checkAWSCredentials(callback: (err?) => void){
    let cognitoUser = this.userPool.getCurrentUser();
  
    if(!cognitoUser){
      return callback(true);
    }

    if(((config.credentials) as CognitoIdentityCredentials).needsRefresh()){
  
      cognitoUser.getSession((err, session: CognitoUserSession) => {
        if(err){
          console.log(err);
          return callback(err);
        }

        cognitoUser.refreshSession(session.getRefreshToken(), (err, session: CognitoUserSession) => {
          if(err){
            console.log(err);
            return callback(err);
          }
          
          let logins = {
            [environment.cognitoIdentityEndpoint]: session.getIdToken().getJwtToken()
          };
      
          let creds = new CognitoIdentityCredentials({
            IdentityPoolId: environment.cognitoIdentityPoolId,
            Logins: logins
          },{
            region: environment.region
          });
      
          config.credentials = creds;
    
          ((config.credentials) as CognitoIdentityCredentials).refresh((err) => {
            if(err){
              console.log(err);
              return callback(err);
            }
            callback();
          });
        });
        
      });
    } else {
      callback();
    }
  }

  public logout(){
    let cognitoUser = this.userPool.getCurrentUser();
    if(cognitoUser){
      cognitoUser.signOut();
    }

    // Clear Cognito Cache ID and re-initialize
    ((config.credentials) as CognitoIdentityCredentials).clearCachedId();
    let creds = new CognitoIdentityCredentials({
      IdentityPoolId: environment.cognitoIdentityPoolId
    },{
      region: environment.region
    });      
    config.credentials = creds;
    this.setUser(null);
  }
}

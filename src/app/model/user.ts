import * as _ from 'lodash';
import { CognitoUser } from 'amazon-cognito-identity-js';

export class User {
  
  private _cognitoUser: CognitoUser;
  private _first_name: string;
  private _last_name: string;
  private _email?: string;
  private _username?: string;
  private _phone_number?: string;

  get cognitoUser(){ return this._cognitoUser };

  get first_name(){ return this._first_name; }
  set first_name(first_name: string){ this._first_name = first_name };

  get last_name(){ return this._last_name; }
  set last_name(last_name: string){ this._last_name = last_name };

  get email(){ return this._email; }
  set email(email: string){ this._email = email };

  get username(){ return this._username; }
  set username(username: string){ this._username = username };

  get phone_number(){ return this._phone_number; }
  set phone_number(phone_number: string){ this._phone_number = phone_number };

  constructor(cognitoUser: CognitoUser){
    this._cognitoUser = cognitoUser;
  }

  getInitial(){
    let initial;

    if(this.first_name){
      initial = this.first_name.substring(0, 1);
    } else if(this.email){
      initial = this.email.substring(0, 1);
    } else if(this.phone_number){
      initial = this.phone_number.substring(0, 1);
    }

    return _.toUpper(initial);
  }
}
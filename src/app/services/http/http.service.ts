import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '..';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HTTP_HEADER_CONTENT_TYPE, MIME_TYPE_JSON, HTTP_HEADER_AUTHORIZATION } from '../../utils/constant';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { CognitoUserSession } from 'amazon-cognito-identity-js';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiEndpoint = environment.apiEndpoint;
  

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }
  
  public get<T>(path, httpParams, additionalHeaders): Observable<T[] | T | any>{
    let result;
    this.authService.user.cognitoUser.getSession((err, session: CognitoUserSession) => {
      if(err){
        return result = of(err);
      }

      let url = new URL(path, this.apiEndpoint);
      let headers = _.assign({}, additionalHeaders, { 
        [ HTTP_HEADER_CONTENT_TYPE ]: MIME_TYPE_JSON,
        [ HTTP_HEADER_AUTHORIZATION ]: session.getIdToken().getJwtToken()
      });

      return result = this.http.get<T[] | T>(url.toString(), {
        headers: new HttpHeaders(headers),
        params: httpParams
      });
    });
    return result;
  }

}

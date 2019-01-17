import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import * as Constant from '../../../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpService
  ) { }

  public getList(data?: any) {
    // return [];
    return this.http.get(Constant.Path.USER.GET_LIST, data);
  }

  public getDetail(data?: any) {
    // return [];
    return this.http.get(Constant.Path.USER.GET_DETAIL.concat('/', data.id));
  }

  public add(data?: any) {
    // return [];
    return this.http.post(Constant.Path.USER.ADD, data);
  }

  public update(data?: any) {
    // return [];
    return this.http.put(Constant.Path.USER.UPDATE, data);
  }

  public resetPassword(data?: any) {
    // return [];
    return this.http.put(Constant.Path.USER.RESET_PASSWORD, data);
  }

  public export(data?: any) {
    // return [];
    return this.http.get(Constant.Path.USER.EXPORT, data);
  }
}

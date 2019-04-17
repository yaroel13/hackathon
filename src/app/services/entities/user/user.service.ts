import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { HttpService } from '../../../services/http/http.service';
import * as Constant from '../../../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpService
  ) { }

  private data = [
    {
      id: 1,
      name: "Jerica",
      code: "JEC",
      email: "jerica.l@electronicscience.com",
      status: 1
    },
    {
      id: 2,
      name: "Jerome",
      code: "JEROME",
      email: "jerome.p@electronicscience.com",
      status: 1
    },
    {
      id: 3,
      name: "Allan",
      code: "ALLAN",
      email: "allan.d@electronicscience.com",
      status: 1
    },
    {
      id: 4,
      name: "Alonzo",
      code: "ZOE",
      email: "alonzo.m@electronicscience.com",
      status: 1
    },
    {
      id: 5,
      name: "Lielle",
      code: "LIELLE",
      email: "lielle.b@electronicscience.com",
      status: 1
    },
    {
      id: 6,
      name: "Paulo",
      code: "PAU",
      email: "paulo.r@electronicscience.com",
      status: 1
    },
    {
      id: 7,
      name: "Roland",
      code: "ROLAND",
      email: "roland.r@electronicscience.com",
      status: 1
    },
    {
      id: 8,
      name: "Kiko",
      code: "KIKO",
      email: "francis.g@electronicscience.com",
      status: 1
    }
  ];

  public getList(data?: any) {
    return of({
      data: this.data,
      metadata: _.assign(data, { total: this.data.length })
    });
    // return this.http.get(Constant.Path.USER.GET_LIST, data);
  }

  public getDetail(data?: any) {
    return of({
      data: _.find(this.data, { id: data.id }),
      metadata: data
    });
    // return this.http.get(Constant.Path.USER.GET_DETAIL.concat('/', data.id));
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

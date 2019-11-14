import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient) {} 

  getProjectList() : Observable<any> {
    const url = environment.apiEndpoint + '/project.json'
    return this.httpClient.get(url)
  }

}

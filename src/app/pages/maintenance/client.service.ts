import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient) {} 

  getProjectList() : Observable<any> {
    const url = environment.apiEndpoint + '/project'
    return this.httpClient.get(url)
  }

  getClientList(pid) : Observable<any> {
    const url = environment.apiEndpoint + '/client/dropdown'
    let qparams = new HttpParams().set('project_id', pid)
    return this.httpClient.get(url,{params:qparams})
  }

  getInvoiceDetails(cpid): Observable<any> {
    const url = environment.apiEndpoint + '/invoice/initiate'
    let qparams = new HttpParams().set('client_project_id',cpid)
    return this.httpClient.get(url,{params:qparams})
  }

  getInvoiceCode(): Observable<any> {
    const url = environment.apiEndpoint + '/invoice_code/unused'
    return this.httpClient.get(url)
  }

  saveInvoice(request): Observable<any> {
    console.log(request)
    const url = environment.apiEndpoint + '/invoice'
    return this.httpClient.post(url, request)
  }

}

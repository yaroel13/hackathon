import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ClientService } from '../client.service';

@Component({
  selector: 'esc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  project: any
  client: any

  constructor(
    public media: ObservableMedia,
    private clientService: ClientService
  ) { }

  public emittedData;
  public inv_code

  ngOnInit() {
    this.getUnusedInvoiceCode()
  }

  onHeaderEmit(data){
    this.emittedData = data;
  }

  clearData(){
    this.emittedData = undefined;
  }

  onProjectChange(data){
    this.project = data
  }

  onClientChange(data){
    this.client = data
  }

  getUnusedInvoiceCode(){
    this.clientService.getInvoiceCode().subscribe(data => {
      console.log(data)
      this.inv_code = data
    })
  }

}

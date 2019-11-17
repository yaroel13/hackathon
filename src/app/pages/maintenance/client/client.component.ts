import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ClientService } from '../client.service';
import { BulkInvoiceData, AddBulkInvoiceComponent } from 'src/app/utils/dialog/add-bulk-invoice/add-bulk-invoice.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'esc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  project: any
  client: any
  bulk_invoice: BulkInvoiceDetail

  constructor(
    public media : ObservableMedia,
    private clientService : ClientService,
    public dialog : MatDialog
  ) { }

  public emittedData;
  public inv_code

  ngOnInit() {
    // this.getUnusedInvoiceCode()
    this.getBulkInvoiceCode()
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

  getBulkInvoiceCode(){
    this.clientService.getBulkInvoiceCode().subscribe(data => {
      this.bulk_invoice = data
      // this.bulk_invoice.last_invoice_code_unused = "n/a"
      if(this.bulk_invoice.last_invoice_code_unused == "n/a"){
        let bulkData: BulkInvoiceData = {
          beginning_invoice_code : this.bulk_invoice.beginning_invoice_code,
          last_used_invoice : this.bulk_invoice.last_invoice_code_used
        }    
        const dialogref = this.dialog.open(AddBulkInvoiceComponent, {
          width: '350px',
          data: bulkData,
          disableClose: true
        })

        dialogref.afterClosed().subscribe(result => {
          console.log(result)
          let request:BulkInvoiceDetailRequest = 
          {
            beginning_invoice_code : this.bulk_invoice.beginning_invoice_code,
            quantity : result
          }

          this.clientService.postBulkInvoiceCode(request).subscribe(data => {
            this.getUnusedInvoiceCode()
          })
        })

      } else {
        this.getUnusedInvoiceCode()
      }
    })
  }

}

export interface BulkInvoiceDetail{
  beginning_invoice_code : string,
  last_invoice_code_unused : string,
  last_invoice_code_used : string
}

export interface BulkInvoiceDetailRequest{
  beginning_invoice_code : string,
  quantity : string
}
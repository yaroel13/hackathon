import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'esc-add-bulk-invoice',
  templateUrl: './add-bulk-invoice.component.html',
  styleUrls: ['./add-bulk-invoice.component.scss']
})
export class AddBulkInvoiceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddBulkInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulkInvoiceData) {}

  input:any
  error_message:string

  ngOnInit() {
  }

  ok(){
    if(this.input == undefined || this.input < 1){
      this.error_message = "Invalid Input"
      return
    }
    this.dialogRef.close(this.input)
  }
}

export interface BulkInvoiceData {
  beginning_invoice_code:string,
  last_used_invoice:string
}
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'
import { ClientService } from '../../client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientProject } from '../project-invoice/project-invoice.component';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent, DialogData } from 'src/app/utils/dialog/generic-dialog/generic-dialog.component';

@Component({
  selector: 'esc-project-invoice-form',
  templateUrl: './project-invoice-form.component.html',
  styleUrls: ['./project-invoice-form.component.scss']
})
export class ProjectInvoiceFormComponent implements OnInit, OnChanges {

  months:String[]
  selectedMonth:String
  totalAmount = 0
  invoice:Invoice
  vat_exempted:boolean
  error_message = "Error"

  @Output() invoiceCodeChange = new EventEmitter<boolean>()
  @Input() project = {id:0,project_name:""}
  @Input() client:ClientProject
  @Input() invoice_code:InvoiceCode

  public form: FormGroup

  constructor(
    private fb : FormBuilder,
    private clientService : ClientService,
    public dialog : MatDialog
    ) { }

  ngOnInit() {
    this.initForm()
    this.selectedMonth = moment().format('MMMM')
    this.months = moment.localeData('en').months()
    // this.getUnusedInvoiceCode()
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
    if(changes.client && this.client != undefined){
      this.getInvoice(this.client.client_project_id)
    }
  }

  initForm(){
    this.vat_exempted = false

    this.form = this.fb.group({
      amount_per_user: [null, [Validators.required, Validators.maxLength(11)]],
      number_of_user: [null, [Validators.required, Validators.maxLength(3)]],
      vat_exempted: [false]
    })

    this.form.controls['amount_per_user'].valueChanges.subscribe(value => {
      try{
        this.totalAmount = this.form.controls['amount_per_user'].value * this.form.controls['number_of_user'].value
        if(!this.vat_exempted){
          let tax = this.totalAmount * .12
          this.totalAmount = this.totalAmount + tax
        }
      } catch(e) { 
        console.log(e)
        this.totalAmount = 0
      }
    })

    this.form.controls['number_of_user'].valueChanges.subscribe(value => {
      try{
        this.totalAmount = this.form.controls['amount_per_user'].value * this.form.controls['number_of_user'].value
        if(!this.vat_exempted){
          let tax = this.totalAmount * .12
          this.totalAmount = this.totalAmount + tax
        }
      } catch(e) { 
        console.log(e)
        this.totalAmount = 0
      }
    })

    this.form.controls['vat_exempted'].valueChanges.subscribe(value => {
      try{
        this.totalAmount = this.form.controls['amount_per_user'].value * this.form.controls['number_of_user'].value
        if(!value){
          let tax = this.totalAmount * .12
          this.totalAmount = this.totalAmount + tax
        }
      } catch(e) { 
        console.log(e)
        this.totalAmount = 0
      }
    })
    
  }

  getSelectedMonth(event){
    console.log(event)
  }

  getInvoice(cpid){
    this.clientService.getInvoiceDetails(cpid).subscribe(data => {
      console.log(data)
      this.invoice = data
      this.form.controls['amount_per_user'].setValue(this.invoice.amount_per_user)
      this.form.controls['number_of_user'].setValue(this.invoice.user_count)
      // let invoice_data:Invoice = data
      // this.form.controls['invoice_code'].setValue(data.invoice_code.invoice_code)
    })
  }

  getProjectName(){
    return this.project != undefined ? this.project.project_name : "Project"
  }

  getClientName(){
    return this.client != undefined ? this.client.client_name : "Client"
  }

  getInvoiceCode(){
    return this.invoice_code != undefined ? this.invoice_code.invoice_code : "NA"
  }

  generateInvoiceRequest():Invoice{
    const year = moment().format("YYYY")

    let vat_exempted = this.form.controls['vat_exempted'].value == true ? 1 : 0

    let invoice_code:InvoiceCode =
    {
      id : this.invoice_code.id,
      invoice_code : this.invoice_code.invoice_code
    }
    
    return {
            invoice_code : invoice_code,
            client_project_id : this.client.client_project_id,
            client_name : this.client.client_name,
            project_name : this.project.project_name,
            billing_period : this.selectedMonth+" "+year,
            user_count : this.form.controls['number_of_user'].value ,
            amount_per_user : this.form.controls['amount_per_user'].value,
            is_vat_exempt : vat_exempted,
            total_amount : this.totalAmount
          }    
  }

  postInvoice(){
    console.log(this.form.controls['amount_per_user'].errors)
    if(this.form.valid){
      const request = {
        invoice:this.generateInvoiceRequest()
      }
      console.log(request)
      this.clientService.saveInvoice(request).subscribe(data => {
        console.log(data)
        let dialogData:DialogData = {
          message: "New Invoice has been created",
          title: "Success"
        }
        let displayDialog = this.dialog.open(GenericDialogComponent,{
          width: '250px',
          data: dialogData        
        })
  
        displayDialog.afterClosed().subscribe(result => {
          // this.getUnusedInvoiceCode()
          // this.getNewInvoiceCodes
          this.invoiceCodeChange.emit(true)
          this.clearForm()
        })
  
      })
    }
  }

  postSetEnabled(){
    if (this.project == undefined || this.client == undefined || this.invoice == undefined || this.invoice_code == undefined)
      return true
  }

  displayDialog(){
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      width: '250px',
      data: {ray:"quijano"}
    });
  }

  clearForm(){
    this.form.controls['amount_per_user'].setValue('')
    this.form.controls['number_of_user'].setValue('')
  }

  resetDefaultValue(){
    this.form.controls['amount_per_user'].setValue(this.invoice.amount_per_user)
    this.form.controls['number_of_user'].setValue(this.invoice.user_count)
  }

  displayError(){
    if(this.invoice_code == undefined){
      return "Invoice code missing"
    }
    else if(this.project == undefined){
      return "Project detail missing"
    }
    else if(this.client == undefined){
      return "Client detail missing"
    }
    else if(this.invoice_code == undefined){
      return "Invoice detail missing"
    }
  }

}

export interface Invoice {
  invoice_code: InvoiceCode,
  client_project_id: number,
  client_name: string,
  project_name: string,
  billing_period: string,
  user_count: number,
  amount_per_user: number,
  is_vat_exempt: number,
  total_amount: any
}

export interface InvoiceCode {
  id: number,
  invoice_code: string
}

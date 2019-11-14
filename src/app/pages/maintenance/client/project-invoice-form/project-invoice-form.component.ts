import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { ClientService } from '../../client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'esc-project-invoice-form',
  templateUrl: './project-invoice-form.component.html',
  styleUrls: ['./project-invoice-form.component.scss']
})
export class ProjectInvoiceFormComponent implements OnInit {

  months:String[]
  selectedMonth:String
  totalAmount = 0

  @Input() project = {id:0,project_name:""}

  public form: FormGroup

  constructor(
    private fb : FormBuilder,
    private clientService : ClientService
    ) { }

  ngOnInit() {
    this.initForm()
    this.selectedMonth = moment().format('MMMM')
    this.months = moment.localeData('en').months()
    this.getInvoice()
  }

  initForm(){
    this.form = this.fb.group({
      invoice_code: [{value: '', disabled: true}],
      amount_per_user: [null, [Validators.required, Validators.maxLength(3)]],
      number_of_user: [null, [Validators.required, Validators.maxLength(3)]]
    })

    this.form.controls['amount_per_user'].valueChanges.subscribe(value => {
      try{
        this.totalAmount = this.form.controls['amount_per_user'].value * this.form.controls['number_of_user'].value
      } catch(e) { 
        console.log(e)
        this.totalAmount = 0
      }
    })

    this.form.controls['number_of_user'].valueChanges.subscribe(value => {
      try{
        this.totalAmount = this.form.controls['amount_per_user'].value * this.form.controls['number_of_user'].value
      } catch(e) { 
        console.log(e)
        this.totalAmount = 0
      }
    })
    
  }

  getSelectedMonth(event){
    console.log(event)
  }

  getInvoice(){
    this.clientService.getInvoice().subscribe(data => {
      console.log(data)
      this.form.controls['invoice_code'].setValue(data.invoice.invoice_code.invoice_code)
    })
  }

}

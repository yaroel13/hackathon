import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'esc-project-invoice-form',
  templateUrl: './project-invoice-form.component.html',
  styleUrls: ['./project-invoice-form.component.scss']
})
export class ProjectInvoiceFormComponent implements OnInit {

  months:String[]
  selectedMonth:String

  constructor() { }

  ngOnInit() {
    this.selectedMonth = moment().format('MMMM')
    this.months = moment.localeData('en').months()
  }

  getSelectedMonth(event){
    console.log(event)
  }

}

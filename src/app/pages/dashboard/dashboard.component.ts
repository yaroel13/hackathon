import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common'
import * as _ from 'lodash';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../services';

@Component({
  selector: 'esc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chartData:Array<any>;
  public chartLabels:Array<any>;
  public chartOptions:any = {
    title: {
      display: true,
      text: [
        "Bitcoin Price Index (USD)"
      ]
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
          {
            ticks: {
              callback: (value) => {
                return formatCurrency(value, window.navigator.language, '$', 'USD', '1.2-2');
              }
            }
          }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return formatCurrency(tooltipItem.yLabel, window.navigator.language, '$', 'USD', '1.2-2');
        }
      }
    }
  };

  constructor(
    private http: HttpClient,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.http.get("https://api.coindesk.com/v1/bpi/historical/close.json").subscribe((data: any) => {
      console.log(data);
      this.chartData = [];
      this.chartLabels = [];
      
      let dataArr = [];

      _.forEach(data.bpi, (value, key) => {
        dataArr.push(value);
        this.chartLabels.push(key);
      });

      console.log(dataArr)
        
      this.chartData.push({
        data: dataArr
      });
    })
  }

 
  public randomize():void {
    let _chartData:Array<any> = new Array(this.chartData.length);
    for (let i = 0; i < this.chartData.length; i++) {
      _chartData[i] = {data: new Array(this.chartData[i].data.length), label: this.chartData[i].label};
      for (let j = 0; j < this.chartData[i].data.length; j++) {
        _chartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.chartData = _chartData;
  }

}

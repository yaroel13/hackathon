import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'esc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    public media: ObservableMedia
  ) { }

  public emittedData;

  ngOnInit() {
  }

  onHeaderEmit(data){
    this.emittedData = data;
  }

  clearData(){
    this.emittedData = undefined;
  }
}
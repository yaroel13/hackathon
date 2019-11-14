import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'esc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

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

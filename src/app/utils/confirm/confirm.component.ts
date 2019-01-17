import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'esc-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public title: string;
  public message: string;
  public hasCancel: boolean;
  public color: string;
  public button: string;
  public extraButton: string;
  public extraButtonFn: () => void;

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.title = _.has(this.data, 'title') ? this.data.title : null;
    this.message = _.has(this.data, 'message') ? this.data.message : null;
    this.hasCancel = _.has(this.data, 'hasCancel') ? this.data.hasCancel : true;
    this.color = _.has(this.data, 'color') ? this.data.color : null;
    this.button = _.has(this.data, 'button') ? this.data.button : "Ok";
    this.extraButton = _.has(this.data, 'extraButton') ? this.data.extraButton : null;
    this.extraButtonFn = _.has(this.data, 'extraButtonFn') && _.isFunction(this.data.extraButtonFn) ? this.data.extraButtonFn : () => {};
  }

}

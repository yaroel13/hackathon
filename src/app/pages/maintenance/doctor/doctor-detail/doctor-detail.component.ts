import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'esc-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {

  doctor;

  private _item;

  @Input()
  set item(item: object) {
    console.log("set")
    this._item = {id: 1, code: this.route.snapshot.paramMap.get('code')};
  }

  get item(): object { return this._item; }

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'esc-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {

  public item;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      console.log(this.route.snapshot.paramMap.get('code'));
      this.item = {
        code: this.route.snapshot.paramMap.get('code')
      }
    });
  }
}

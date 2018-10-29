import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'esc-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {

  doctor;

  @Input() item;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // console.log(this.item);
    // this.route.params.subscribe(routeParams => {
    //   // this.loadUserDetail(routeParams.id);
      this.getDetail();
    // });
  }

  getDetail(): void {
    // console.log(this.route.snapshot.paramMap.get('code'));
    this.item = {id: 1, code: this.route.snapshot.paramMap.get('code')};
  }

}

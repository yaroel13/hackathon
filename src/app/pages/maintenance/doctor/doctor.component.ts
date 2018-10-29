import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'esc-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  selectedDoctor;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      console.log(this.route.snapshot.paramMap.get('code'));
      this.selectedDoctor = this.route.snapshot.paramMap.get('code');
    });
  }

  public getSelectedDoctor() {
    return this.route.snapshot.paramMap.get('code');
  }
}
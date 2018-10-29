import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'esc-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.scss']
})
export class DoctorHeaderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code'];
  dataSource = new MatTableDataSource<Doctor>(DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // items = Array.from({length: 100000}).map((_, i) => { return {id: i, code: `Item #${i}`}});
  items = Array.from({length: 100000}).map((_, i) => ({id: i, code: `Item${i}`}));


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sampleClick(row){
    // console.log(row);
    console.log(this.route);
    // console.log(this.route.snapshot.pathFromRoot.filter(i => i.url[0]!=='').map(o => o.url[0]).join('/'));

  }

  getCurrentRoute(item) {
    return this.route.snapshot['_routerState'].url + '/' + item.code;
  }

}

export interface Doctor {
  id: number;
  code: string;
  first_name: string;
  last_name: string;
}

const DATA: Doctor[] = [
  {id: 1, code: '1102MD000343', first_name: 'ALEXANDER', last_name: 'ALCANTARA'},
  {id: 2, code: '1102MD007435', first_name: 'NEIL LEE', last_name: 'AMBASSING'},
  {id: 3, code: '1102MD035779', first_name: 'GLENN', last_name: 'ANDAL'},
  {id: 4, code: '1102MD046564', first_name: 'KERWIN', last_name: 'ANG'},
  {id: 5, code: '1102MD007755', first_name: 'MARITES', last_name: 'APELLANES'},
  {id: 6, code: '1102MD033959', first_name: 'MARY MARGARET', last_name: 'APOLINAR'},
  {id: 7, code: '1102MD007800', first_name: 'ANASTACIO', last_name: 'AQUINO'},
  {id: 8, code: '1102MD000769', first_name: 'LEONIDES', last_name: 'ARCALAS'},
  {id: 9, code: '1102MD000770', first_name: 'ROSEMARIE', last_name: 'ARCALAS'},
  {id: 10, code: '1102MD035826', first_name: 'ANNALISA', last_name: 'AROMIN'}
];
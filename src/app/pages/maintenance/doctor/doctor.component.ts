import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'esc-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code', 'first_name', 'last_name'];
  dataSource = new MatTableDataSource<Doctor>(DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sampleClick(row){
    console.log(row)
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
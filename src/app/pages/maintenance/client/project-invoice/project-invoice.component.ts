import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'
import { ClientService } from '../../client.service';

export interface Food {
  value: string;
  viewValue: string;
}

export interface Project {
  id: number;
  project_name: string;
}

export interface ClientProject {
  id: number;
  client_id: number;
  project_id: number;
  client_name: string;
}

@Component({
  selector: 'esc-project-invoice',
  templateUrl: './project-invoice.component.html',
  styleUrls: ['./project-invoice.component.scss']
})
export class ProjectInvoiceComponent implements OnInit {

  projects : Project[]
  
  // clientproject: ClientProject[] = [
  //   {id: 0, client_id: 0, project_id: 1, client_name: "Ray"},
  //   {id: 1, client_id: 0, project_id: 1, client_name: "Quijano"}
  // ]

  selectedProject

  filteredClientProject: ClientProject[]

  constructor( private clientService : ClientService) { }

  ngOnInit() {
    this.getProjectListData()
  }

  getProjectListData(){
    this.clientService.getProjectList().subscribe((data) => {
      console.log(data)
      this.projects = data;
      this.selectedProject = this.projects[0].id
    })
  }

  getProjectClientListData(projectId){
    console.log(projectId)
  }

  onProjectSelect(event:any){
    console.log(event)
  }

}

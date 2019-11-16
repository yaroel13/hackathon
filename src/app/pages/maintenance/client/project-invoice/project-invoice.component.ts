import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  client_project_id: number;
  client_name: string;
}

@Component({
  selector: 'esc-project-invoice',
  templateUrl: './project-invoice.component.html',
  styleUrls: ['./project-invoice.component.scss']
})
export class ProjectInvoiceComponent implements OnInit {

  projects : Project[]

  @Output() projectChange = new EventEmitter<boolean>();
  @Output() clientChange = new EventEmitter<boolean>();
  
  // clientproject: ClientProject[] = [
  //   {id: 0, client_id: 0, project_id: 1, client_name: "Ray"},
  //   {id: 1, client_id: 0, project_id: 1, client_name: "Quijano"}
  // ]

  selectedProject
  selected_client

  client_list: ClientProject[]

  constructor( private clientService : ClientService) { }

  ngOnInit() {
    this.getProjectListData()
  }

  getProjectListData(){
    this.clientService.getProjectList().subscribe((data) => {
      console.log(data) 
      this.projects = data.project;
      this.selectedProject = this.projects[0]
      this.getProjectClientListData(this.selectedProject)
    })
  }

  getProjectClientListData(project){
    console.log(project)
    this.projectChange.emit(project)
    this.clientService.getClientList(project.id).subscribe((data) => {
      console.log(data)
      this.client_list = data.client
      this.selected_client = this.client_list[0]
      this.clientChange.emit(this.selected_client)
    })
  }

  onProjectSelect(event:any){
    console.log(event)
  }

  getNewClient(data){
    this.clientChange.emit(data)
  }

}

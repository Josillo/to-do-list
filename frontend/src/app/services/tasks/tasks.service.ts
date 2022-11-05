import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { AddTaskEndpoint, Task, UpdateTaskEndpoint } from './tasks-service.model';
import { ADD_TASK_ENDPOINT, DELETE_TASK_ENDPOINT, GET_TASKS_ENDPOINT, UPDATE_TASK_ENDPOINT } from './tasks-service.endpoints';
import { BASE_URL } from 'src/app/app.constants';
import { supplant } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private readonly http: HttpClient) { }

  private getOptions(){
    const token = localStorage.getItem('token');
    if(!token) {
      return {};
    }
    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getTasks(): Observable<Task[]> {
    const url = BASE_URL + GET_TASKS_ENDPOINT;
    return this.http.get<Task[]>(url, this.getOptions());
  }

  deleteTask(task_id: string): Observable<any> {
    const url = BASE_URL + supplant(DELETE_TASK_ENDPOINT, {task_id});
    return this.http.delete(url, this.getOptions());
  }

  updateTask(params: UpdateTaskEndpoint): Observable<any> {
    const url = BASE_URL + supplant(UPDATE_TASK_ENDPOINT, {task_id: params.id});
    return this.http.put(url, { status: params.status}, this.getOptions());
  }

  addTask(params: AddTaskEndpoint): Observable<any> {
    const url = BASE_URL + ADD_TASK_ENDPOINT;
    let formData = new FormData(); 
    for ( var key in params ) {
      formData.append(key, params[key]);
    }
    return this.http.post(url, formData, this.getOptions());
  }
}

// const MOCKED_TASKS_LIST: Task[] = [{
//   id: '001',
//   description: 'Daily meeting at 9.00',
//   status: false }, {
//   id: '002',
//   description: 'Check merge requests on integration',
//   status: false }, {
//   id: '003',
//   description: 'Develop topic 005789 - Tools and parameters',
//   status: true }
// ];

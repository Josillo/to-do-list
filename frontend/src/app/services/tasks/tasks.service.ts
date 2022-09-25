import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddTaskEndpoint, Task, UpdateTaskEndpoint } from './tasks-service.model';
import { ADD_TASK_ENDPOINT, DELETE_TASK_ENDPOINT, GET_TASKS_ENDPOINT, UPDATE_TASK_ENDPOINT } from './tasks-service.endpoints';
import { BASE_URL } from 'src/app/app.constants';
import { supplant } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasksList$: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  constructor(private readonly http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const url = BASE_URL + GET_TASKS_ENDPOINT;
    this.tasksList$.next(MOCKED_TASKS_LIST);
    return of(MOCKED_TASKS_LIST);
    return this.http.get<Task[]>(url).pipe(
      map(data => {
        this.tasksList$.next(data);
        return data;
      })
    );
  }

  deleteTask(task_id: string): Observable<any> {
    const url = BASE_URL + supplant(DELETE_TASK_ENDPOINT, {task_id});
    return this.http.delete(url);
  }

  updateTask(params: UpdateTaskEndpoint): Observable<any> {
    const url = BASE_URL + supplant(UPDATE_TASK_ENDPOINT, {task_id: params.id});
    return this.http.put(url, { status: params.status});
  }

  addTask(params: AddTaskEndpoint): Observable<any> {
    const url = BASE_URL + ADD_TASK_ENDPOINT;
    return this.http.post(url, params);
  }
}

const MOCKED_TASKS_LIST: Task[] = [{
  id: '001',
  description: 'Daily meeting at 9.00',
  status: false }, {
  id: '002',
  description: 'Check merge requests on integration',
  status: false }, {
  id: '003',
  description: 'Develop topic 005789 - Tools and parameters',
  status: true }
];

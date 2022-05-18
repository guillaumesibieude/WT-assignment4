import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Task {
  name: string;
  notes: string;
  creator: object;
  completed: boolean;
  priorityLvl: number;
  completionDate: any;
  assignedUsers: Array<object>;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppAPIService {

  constructor(private http: HttpClient) { }

  getCompletedTasks() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get<Task[]>('/api/task/completed_tasks', {headers: headers});
  }

  getCreatedTasks() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get<Task[]>('/api/task/created_tasks', {headers: headers});
  }

  getAssignedTasks() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get<Task[]>('/api/task/assigned_tasks', {headers: headers});
  }

  createTask(task: Task) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.post('/api/task', task, {headers: headers, observe: "response"});
  }

  //ajouter le champ _id à l'object Task
  editTask(task: Task) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.put('/api/task', task, {headers: headers, observe: "response"});
  }

  deleteTask(taskId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.delete('/api/task/' + taskId, {headers: headers, observe: "response"});
  }

  assignTask(taskId: string, userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    });
    const body = {
      "taskId": taskId,
      "userId": userId
    };
    return this.http.put('/api/task/assign', body, {headers: headers, observe: "response"});
  }

  completeTask(taskId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.put('/api/task/complete', {"taskId": taskId}, {headers: headers, observe: "response"});
  }

  getAllUsers(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get('/api/user/all_users', {headers: headers});
  }
}
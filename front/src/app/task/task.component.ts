import { Component, OnInit, Input } from '@angular/core';
import { Task, AppAPIService } from '../app.api-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [AppAPIService]
})
export class TaskComponent implements OnInit {

  @Input() task!: any;
  users: any;
  assignForm = new FormGroup({
    user: new FormControl('', Validators.required)
  });
  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    notes: new FormControl('')
  });
  

  constructor(private apiService: AppAPIService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getAllUsers()
    .subscribe(data => {console.log(data); this.users = data; console.log("users:" + this.users)})
    this.editForm.setValue({
      name: this.task!.name,
      date: "",
      priority: this.task!.priorityLvl,
      notes: this.task!.notes!
   });
  }

  delete_task(): void {
    this.apiService.deleteTask(this.task._id)
    .subscribe(res => {
      if (res.status != 200) {
        //error
      }
      else {
        window.location.reload();
      }
    });
  }

  edit_task(): void {
    let name = this.editForm.get('name')!.value;
    let date = "";
    if (this.editForm.get('date')!.value != ""){
      date = this.editForm.get('date')!.value;
    }
    else{
      date = this.task.date;
    }
    let priority = this.editForm.get('priority')!.value;
    let notes = this.editForm.get('notes')!.value;
    const edited_task = {
      '_id': this.task._id,
      'name': name,
      'completionDate': date,
      'priorityLvl': priority,
      'notes': notes
    } as Task;
    this.apiService.editTask(edited_task)
      .subscribe(res => {
        if (res.status != 204){
          //error
        }
        else {
          window.location.reload();
        }
      });
  }

  assign_to(): void {
    let user = this.assignForm.get('user')!.value;
    this.apiService.assignTask(this.task._id, user)
    .subscribe(res => {
      if (res.status != 204) {
        //error
      }
      else {
        window.location.reload();
      }
    });
  }

  complete_task(): void {
    this.apiService.completeTask(this.task._id)
    .subscribe(res => {
      if (res.status != 204) {
        //error
      }
      else {
        window.location.reload();
      }
    });
  }

}

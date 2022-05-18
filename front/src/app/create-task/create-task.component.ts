import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task, AppAPIService } from '../app.api-service';
import { TaskComponent } from '../task/task.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  providers: [AppAPIService]
})
export class CreateTaskComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    notes: new FormControl('')
  });
  
  constructor(private apiService: AppAPIService, private router: Router) {}

  ngOnInit(): void {
  }

  create(): void {
    let name = this.createForm.get('name')!.value;
    let priority = this.createForm.get('priority')!.value;
    let notes = this.createForm.get('notes')!.value;
    let date = this.createForm.get('date')!.value;
    const created_task = {
      'name': name,
      'notes': notes,
      'priorityLvl': priority,
      'completionDate': date
    } as Task;
    this.apiService.createTask(created_task)
        .subscribe(res => {
          if (res.status != 201){
            //do stuff
          }
          else {
            this.router.navigateByUrl("created_tasks")
          }
        });
  }
}

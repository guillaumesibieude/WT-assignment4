import { Component, OnInit } from '@angular/core';
import { Task, AppAPIService } from '../app.api-service'


@Component({
  selector: 'app-assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.css'],
  providers: [AppAPIService]
})
export class AssignedTasksComponent implements OnInit {

  tasks: any[] = []

  constructor(private apiService: AppAPIService) {}

  ngOnInit(): void {
    this.apiService.getAssignedTasks()
    .subscribe(data => {console.log(data); this.tasks = data})
  }
}

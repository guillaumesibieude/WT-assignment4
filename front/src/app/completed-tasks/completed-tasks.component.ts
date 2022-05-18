import { Component, OnInit } from '@angular/core';
import { Task, AppAPIService } from '../app.api-service'

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css'],
  providers: [AppAPIService]
})
export class CompletedTasksComponent implements OnInit {

  tasks: any[] = []

  constructor(private apiService: AppAPIService) {}

  ngOnInit(): void {
    this.apiService.getCompletedTasks()
    .subscribe(data => {console.log(data); this.tasks = data})
  }
}

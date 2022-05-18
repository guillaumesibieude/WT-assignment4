import { Component, OnInit } from '@angular/core';
import { Task, AppAPIService } from '../app.api-service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [AppAPIService]
})
export class TasksComponent implements OnInit {

  tasks: any[] = []

  constructor(private apiService: AppAPIService) {}

  ngOnInit(): void {
    this.apiService.getCreatedTasks()
    .subscribe(data => {console.log(data); this.tasks = data})
  }
}

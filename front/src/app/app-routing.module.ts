import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssignedTasksComponent } from './assigned-tasks/assigned-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: 'login', component: RegisterComponent},
  {path: 'created_tasks', component: TasksComponent},
  {path: 'assigned_tasks', component: AssignedTasksComponent},
  {path: 'completed_tasks', component: CompletedTasksComponent},
  {path: 'create_task', component: CreateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

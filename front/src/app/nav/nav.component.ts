import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthService]
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  new_task(): void {
    this.router.navigateByUrl("/create_task")
  }
  
  created_tasks(): void {
    this.router.navigateByUrl("/created_tasks")
  }

  assigned_tasks(): void {
    this.router.navigateByUrl("/assigned_tasks")
  }

  completed_tasks(): void {
    this.router.navigateByUrl("/completed_tasks")
  }

}

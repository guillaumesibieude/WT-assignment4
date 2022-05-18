import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  signup(): void {
    let username = this.signupForm.get('username')!.value;
    let password = this.signupForm.get('password')!.value;
    let email = this.signupForm.get('email')!.value;
    this.authService.signup(username, password, email);
  }
}

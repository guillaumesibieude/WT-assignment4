import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn() {
    if (localStorage.getItem("jwt") != null)
      return true;
    return false;
  }
  
  login(username: string, password: string) {
    this.http.post('/api/auth/login', {'username': username, 'password': password}, {observe: "response"})
          .subscribe(res => {
            if (res.status == 200){
              localStorage.setItem("jwt", (res.body! as any).accessToken);
              window.location.href = '/';
            }
          })
  }

  logout() {
    localStorage.removeItem("jwt");
    window.location.href = '/';
  }

  signup(username: string, password: string, email: string) {
    this.http.post('api/auth/signup', {'username': username, 'password': password, 'email': email}, {observe: "response"})
          .subscribe(res => {
            if (res.status == 201){
              window.location.href = '/';
            }
          })
  }

}
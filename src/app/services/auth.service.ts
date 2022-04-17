import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import {catchError, Observable, of, throwError} from 'rxjs';

export interface UserInfo{
  email: string
  password: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://timetable-4b073-default-rtdb.firebaseio.com'

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggetInAdmin(){
    return this.getToken() !== null
  }

  login(): Observable<any>{
    return this.http.get<UserInfo>(`${this.url}/users.json`)
  }

  logout(){
    this.router.navigate(['login'])
  }
}

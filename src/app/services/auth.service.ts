import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import {catchError, Observable, of, throwError} from 'rxjs';

export interface UserInfo{
  email: string
  password: string
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

  idLoggetIn(){
    return this.getToken() !== null
  }

  login(): Observable<UserInfo>{
    return this.http.get<UserInfo>(`${this.url}/admin.json`)
  }

  logout(){
    this.router.navigate(['login'])
  }
}

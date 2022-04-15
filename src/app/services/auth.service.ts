import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, Observable, of, throwError} from 'rxjs';

interface UserInfo{
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  idLoggetIn(){
    return this.getToken() !== null
  }

  login(userInfo: UserInfo): Observable<string|boolean>{
    if (userInfo.email == 'admin@gmail.com' 
        && userInfo.password == 'admin123'){
          this.setToken('ycjfcjty6768fvgvhgrd6')
          return of(true)
        }
    return throwError(()=>new Error('Failed Loggin'))
  }

  logout(){
    this.router.navigate(['login'])
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, Observable, of, throwError} from 'rxjs';
import { map } from 'rxjs/operators'


export interface Setting{
  min: number;
  colorTheme: string|null;
  rest:{
    fri: boolean;
    mon: boolean;
    sat: boolean;
    sun: boolean;
    thurs: boolean;
    tues: boolean;
    wed: boolean;
  }
}

interface CreateResponse{
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'https://timetable-4b073-default-rtdb.firebaseio.com'

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getSetting(): Observable<Setting>{
    return this.http.get<Setting>(`${this.url}/setting.json`)
  }

  updateSetting(setting: Setting): Observable<CreateResponse>{
    return this.http.patch<CreateResponse>(`${this.url}/setting.json`,setting)
    .pipe(map(res => {
      return res
  }))
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import {catchError, Observable, of, throwError} from 'rxjs';
import { map } from 'rxjs/operators'

export interface Task{
  id?: string
  title: string 
  date?: string 
  time?: string 
  author_id: string
}

interface CreateResponse{
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'https://timetable-4b073-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }

  addTask(task: Task){
    return this.http.post<CreateResponse>(`${this.url}/tasks/${task.date}.json/`, task)
    .pipe(map((res: { name: any; }) => {
      return {...task, id: res.name}
    }))
  }

  load(date: moment.Moment){
    return this.http
      .get<Task[]>(`${this.url}/tasks/${date.format('DD-MM-YYYY')}.json`)
        .pipe(map(tasks => {
            if (!tasks) {
              return []
            }
            return Object.keys(tasks).map(key => ({...tasks[<any>key], id: key}))
      }))
  }

  remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/tasks/${task.date}/${task.id}.json`)
  }

}

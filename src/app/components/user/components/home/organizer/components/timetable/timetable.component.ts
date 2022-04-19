import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../../services/admin.service'
import { Setting } from '../../../../../../../services/admin.service'
import { FormArray, FormBuilder } from '@angular/forms';
import { TaskService } from '../../../../../../../services/task.service'
import { Task } from '../../../../../../../services/task.service'
import { DateService } from '../../../../../../../services/date.service';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  public setting: Setting | null = null
  public time: Array<moment.Moment> = []
  public array_tasks: Task[] = []

  profileForm = this.fb.group({
    tasks: this.fb.array([
    ])
  })

  constructor(
    public dateService: DateService, 
    private adminService: AdminService,
    private taskService: TaskService,
    private authService: AuthService,
    private fb: FormBuilder  
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit')

    this.adminService.getSetting().subscribe((d)=>{
      this.setting = d      
      let start = moment().set('hour', d.start).set('minute', 0).set('second', 0)
      let end = moment().set('hour', d.end).set('minute', 0).set('second', 0)
      let time = start.clone()
      while(time <= end){
        this.time.push(time.clone())
        this.addInputTask()
        time.add(d.min, 'm')
      }
    })

    this.getTasks()
  }

  get user_id(){
    return this.authService.getToken()
  }

  get tasks() {
    return this.profileForm.get('tasks') as FormArray;
  }

  getTasks(){
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks=>{
      this.array_tasks = tasks
    })
  }

  addInputTask() {
    this.tasks.push(this.fb.control(''));
  }

  save(){
    for (let key in this.tasks.value){
      if (this.tasks.value[key]){
        let task: Task = {
          title: this.tasks.value[key],
          date: this.dateService.date.value.format('DD-MM-YYYY'),
          time: this.time[Number(key)].format('HH:mm'),
          author_id: String(this.authService.getToken())
        }
        this.taskService.addTask(task).subscribe((t)=>{
          this.array_tasks.push(t)
          this.profileForm.reset()
        }, err=>console.error(err))
      }
    }

  }

  taskIsSet(time: string):{rez: boolean, title?: string, task?: Task}{
    let index = this.array_tasks.findIndex((item: Task):boolean=>{
      return (item.time == time)
    })
    if (index > -1){
      return {rez: true, title: this.array_tasks[index].title, task: this.array_tasks[index]}
    } else {
      return {rez: false}
    }
  }

  remove(time: string) {
    let task = this.taskIsSet(time).task
    // console.log('task', task)
    if (task){
      this.taskService.remove(task).subscribe(() => {
        // this.tasks = this.tasks.filter(t => t.id !== task.id)
        // this.onChanged.emit(true);
        this.getTasks()
      }, err => console.error(err))
    }
  }

}

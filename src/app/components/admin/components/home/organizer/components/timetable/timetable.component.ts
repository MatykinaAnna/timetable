import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../../services/admin.service'
import { Setting } from '../../../../../../../services/admin.service'
import * as moment from 'moment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  public setting: Setting | null = null
  public time: Array<moment.Moment> = []

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.adminService.getSetting().subscribe((d)=>{
      this.setting = d      
      let start = moment().set('hour', d.start).set('minute', 0).set('second', 0)
      let end = moment().set('hour', d.end).set('minute', 0).set('second', 0)
      let time = start.clone()
      while(time < end){
        this.time.push(time.clone())
        console.log(this.time[this.time.length-1].format('HH:mm'))
        time.add(d.min, 'm')
      }
    })
  }

}

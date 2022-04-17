import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './components/selector/selector.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { OrganizerRoutingModule } from './organizer-routing.module'
import { MomentPipe } from '../../../../../services/moment.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TimetableComponent } from './components/timetable/timetable.component'

@NgModule({
  declarations: [
    SelectorComponent,
    MainComponentComponent,
    MomentPipe,
    CalendarComponent,
    TimetableComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ]
})
export class OrganizerModule { }

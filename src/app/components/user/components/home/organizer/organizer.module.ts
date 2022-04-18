import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { OrganizerRoutingModule } from './organizer-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TimetableComponent } from './components/timetable/timetable.component'
import { SelectorComponent } from './components/selector/selector.component';
import { DateModuleModule } from 'src/app/date-module/date-module.module';
// import { MomentPipe } from 'src/app/services/moment.pipe';

@NgModule({
  declarations: [
    MainComponentComponent,
    SelectorComponent,
    CalendarComponent,
    TimetableComponent,
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateModuleModule
  ]
})
export class OrganizerModule { }

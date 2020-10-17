import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {FieldService} from '../../services/field.service';
import {SchedulesService} from '../../services/schedules.service';
import {Field} from '../../models/field';
import {Schedule} from '../../models/Schedule';
import {User} from '../../models/user';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  field: Field;
  schedules: Schedule[];
  user: User;
  ev: any;
  calendarOptions: CalendarOptions;

  constructor(
    private authService: AuthService,
    private fieldService: FieldService,
    private scheduleService: SchedulesService
  ) {
    this.ev = [];
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      locale: 'es',
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00.00',
    };
  }

  ngOnInit(): void {
    this.authService.selectedUser$.subscribe(res => {
      this.user = res;
    });
    this.fillCalendar();

  }

  fillCalendar(){
    // Obtener escenario actual
    this.fieldService.getSelectedField().subscribe(res => {
      this.ev = [];
      this.field = res;
      if (this.field){
        // Obtener reservas del escenario actual
        this.scheduleService.getFieldSchedules(this.field._id).subscribe(res => {
          this.schedules = res;
          for (let e of this.schedules){
            this.ev.push({start: e.start, end: e.end});
          }
          this.calendarOptions = {
            initialView: 'timeGridWeek',
            locale: 'es',
            slotMinTime: '08:00:00',
            slotMaxTime: '20:00.00',
            events: this.ev,
          };
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {FieldService} from '../../services/field.service';
import {SchedulesService} from '../../services/schedules.service';
import {Field} from '../../models/field';
import {Schedule} from '../../models/Schedule';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../models/booking";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  field: Field;
  schedules: Schedule[];
  bookings: [Booking];
  user: User;
  ev: any;
  calendarOptions: CalendarOptions;

  constructor(
    private authService: AuthService,
    private fieldService: FieldService,
    private bookingService: BookingService,
    private scheduleService: SchedulesService
  ) {
    this.ev = [];
    this.getUser();
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.user = res;
      if (this.field){
        this.fillCalendar();
      }else {
        this.getField();
      }
    });


  }

  getField(){
    this.fieldService.getSelectedField().subscribe(res => {
      this.field = res;
      this.fillCalendar();
    });
  }


  fillCalendar() {
    this.ev = [];

    if (this.user.role.name === 'director') {
      if (this.field) {
        // Obtener reservas del escenario actual con color y titulo
        this.bookingService.getFieldCalendarBookings(this.field._id).subscribe(res => {
          this.bookings = res;
          for (let e of this.bookings) {
            let aux = new Date(e.schedule[0].start);
            let aux2 = new Date(e.schedule[(e.schedule).length - 1].end);
            aux.setHours(aux.getHours());
            aux2.setHours(aux2.getHours());
            if (e.bkgStatus.code === 'A') {
              if(e.bkgType.code === 'E' || e.bkgType.code === 'U'){
                this.ev.push({start: aux, end: aux2, title: e.desc, color: e.schedule[0].field.color});
              } else{
                this.ev.push({start: aux, end: aux2, title: e.user.email, color: e.schedule[0].field.color});
              }

            } else {
              this.ev.push({start: aux, end: aux2, color: e.schedule[0].field.color});
            }
          }
          this.CalendarOptions();
        });


      } else {
        // Obtener todas las reservas
        this.bookingService.getCalendarBookings().subscribe(res => {
          this.bookings = res;
          for (let b of this.bookings) {
            const aux = new Date(b.schedule[0].start);
            const aux2 = new Date(b.schedule[(b.schedule).length - 1].end);
            aux.setHours(aux.getHours());
            aux2.setHours(aux2.getHours());
            if (b.bkgStatus.code === 'A') {
              if(b.bkgType.code === 'E' || b.bkgType.code === 'U'){
                this.ev.push({start: aux, end: aux2, title: b.desc, color: b.schedule[0].field.color});
              } else{
                this.ev.push({start: aux, end: aux2, title: b.user.email, color: b.schedule[0].field.color});
              }

            } else {
              this.ev.push({start: aux, end: aux2, color: b.schedule[0].field.color});
            }
          }
          this.CalendarOptions();
        });
      }
    } else {
      if (this.field) {
        // Obtener reservas del escenario actual
        this.scheduleService.getFieldSchedules(this.field._id).subscribe(res => {
          this.schedules = res;
          for (let e of this.schedules) {
            let aux = new Date(e.start);
            let aux2 = new Date(e.end);
            aux.setHours(aux.getHours());
            aux2.setHours(aux2.getHours());
            this.ev.push({start: aux, end: aux2});
          }
          this.CalendarOptions();
        });
      }
    }
  }

  CalendarOptions(){
    this.calendarOptions = {
      locale: 'es',
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        list: 'Lista'
      },
      headerToolbar: {
        center: 'timeGridWeek,dayGridMonth,listWeek'
      },
      slotMinTime: '06:00:00',
      slotMaxTime: '20:00.00',
      events: this.ev,
    };
  }
}

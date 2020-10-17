import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FieldService } from '../../services/field.service';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { TypesOfService } from '../../services/types-of.service';
import { User } from '../../models/user';
import { Booking } from '../../models/booking';
import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import {Field} from '../../models/field';
import { CalendarOptions } from '@fullcalendar/angular';
import {SchedulesService} from "../../services/schedules.service";
import {Schedule} from "../../models/Schedule";
declare var M: any;


@Component({
  selector: 'app-main-director',
  templateUrl: './main-director.component.html',
  styleUrls: ['./main-director.component.css']
})
export class MainDirectorComponent implements OnInit, AfterViewInit {
  user: User;
  bookings: Booking[];
  schedules: Schedule[];
  fields: Field[];
  datos: FormGroup;
  ev: any;

  calendarOptions: CalendarOptions;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private bookingService: BookingService,
    private scheduleService: SchedulesService,
    private typeOfService: TypesOfService,
    private fieldService: FieldService
  ) {
    this.bookings = [];
  }

  ngOnInit(): void {
    this.getUser();
    this.getBookings();
    this.fillCalendar();
  }



  getUser(){
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.authService.setSelectedUser(res);
    });

    this.authService.selectedUser$.subscribe(res => {
      this.user = res;
    });
  }

  getBookings(){
    this.bookingService.getBookings().subscribe(res => {
      this.bookings = res;
    })
  }

  fillCalendar(){
    this.ev = [];
    // Obtener reservas del escenario actual
    this.scheduleService.getBookedSchedules().subscribe(res => {
      console.log('schedules', res);
      this.schedules = res;
      if (this.schedules){
        for (let e of this.schedules){
          let aux= new Date(e.start);
          let aux2 = new Date(e.end);
          aux.setHours(aux.getHours() + aux.getTimezoneOffset() / 60);
          aux2.setHours(aux2.getHours() + aux2.getTimezoneOffset() / 60);
          this.ev.push({start: aux , end: aux2});
        }
        this.calendarOptions = {
          initialView: 'timeGridWeek',
          locale: 'es',
          headerToolbar: { center: 'dayGridMonth,timeGridWeek' },
          slotMinTime: '08:00:00',
          slotMaxTime: '20:00.00',
          events: this.ev,
        };
      }
    });
  }

}

import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FieldService } from '../../services/field.service';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { TypesOfService } from '../../services/types-of.service';
import { User } from '../../models/user';
import { Booking } from '../../models/booking';
import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Field} from '../../models/field';
import { CalendarOptions } from '@fullcalendar/angular';
import {SchedulesService} from "../../services/schedules.service";
import {Schedule} from "../../models/Schedule";
import * as M from '../../../assets/materialize/js/materialize.min.js';



@Component({
  selector: 'app-main-director',
  templateUrl: './main-director.component.html',
  styleUrls: ['./main-director.component.css']
})
export class MainDirectorComponent implements OnInit, AfterViewInit {
  user: User;
  bookings: Booking[];
  schedules: Schedule[];
  field: Field;
  fields: Field[];
  aux: any;
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
    this.aux = [];
    this.bookings = [];

    this.datos = this.formBuilder.group({
      field1: ['']
    }, {updateOn: 'change'});

    this.datos.valueChanges.subscribe( res => {
      // console.log(this.datos.get('field1').value);
      const f = this.fieldService.getField(this.datos.get('field1').value).subscribe(res => {
        this.fieldService.setSelectedField(res);
        this.getField();
      });
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getFields();

  }

  ngAfterViewInit() {
    let elems = document.querySelectorAll('.parallax');
    let instances = M.Parallax.init(elems);

  }

  borrarFiltro(){
    this.fieldService.setSelectedField(null);
    this.getFields();
  }

  getUser(){
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.authService.setSelectedUser(res);
    });

    this.authService.selectedUser$.subscribe(res => {
      this.user = res;
    });
  }

  getField(){
    this.fieldService.getSelectedField().subscribe(res => {
      this.field = res;
    });
  }

  getFields(){
    this.fieldService.getFields().subscribe(res => {
      this.fields = res;
    });
  }

  initTabs(){
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  }



}

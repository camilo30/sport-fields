import { Component, OnInit } from '@angular/core';

import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import { FieldService } from '../../services/field.service';
import { BookingService } from '../../services/booking.service';
import {Field} from '../../models/field';
import {Schedule} from '../../models/Schedule';
import { Booking } from '../../models/booking';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import { SchedulesService } from '../../services/schedules.service';
declare var M: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  datos: FormGroup;
  fields: Field[];
  field: Field;
  user: User;
  bookings: Booking[];
  userBookings: Booking[];
  schedules: Schedule[];
  ev: any;

  constructor(
    private formBuilder: FormBuilder,
    private fieldService: FieldService,
    private authService: AuthService,
    private scheduleService: SchedulesService,
    private bookingService: BookingService
  ) {
    this.ev = [];
    this.userBookings = [];
  }



  crearFormulario(){
    this.datos = this.formBuilder.group({
      date: ['', [Validators.required]],
      startT: ['', [Validators.required]],
      endT: ['', [Validators.required]]
    }, {updateOn: 'change'});
  }

  ngOnInit(): void {
    this.crearFormulario();

    // Obtener escenarios y asignarlos a variable
    this.fieldService.getFields().subscribe(res => {
      this.fields = res;
    });
    // Obtener usuario
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.user = res;
      // Una vez obtenido el usuario obtener sus reservas
      this.bookingService.getUserBooking(this.user._id).subscribe(res => {
        this.userBookings = (res);
      }, error => console.log(error));
    });

    // Obtener escenario actual
    this.fieldService.getSelectedField().subscribe(res => {
      this.field = res;
    });
  }

  CancelBooking(_id){
    if(confirm("¿Está seguro de cancelar el préstamo?")) {
      this.bookingService.cancelBooking(_id).subscribe(res => {
          M.toast({html: "Préstamo cancelado", classes: 'red darken-2'});
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }


}

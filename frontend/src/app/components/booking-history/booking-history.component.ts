import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { User } from '../../models/user';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import {Field} from '../../models/field';
import {FieldService} from '../../services/field.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  user: User;
  field: Field;
  bookings: Booking[];

  constructor(
    private authService: AuthService,
    private fieldService: FieldService,
    private bookingService: BookingService
  ) {
    this.bookings = [];
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    // Obtener usuario
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.user = res;
      if (this.field){
        this.getBookings();
      }else {
        this.getField();
      }
    });
  }

  getBookings(){
    if (this.user.role.name === 'director'){
      if (this.field){
        // Si es director se obtienen todas las reservas
        this.bookingService.getFieldHistoryBookings(this.field._id).subscribe(res => {
          this.bookings = (res);
        }, error => console.log(error));
      } else {
        // Si es director se obtienen todas las reservas
        this.bookingService.getHistoryBookings().subscribe(res => {
          this.bookings = (res);
        }, error => console.log(error));
      }

    } else {
      // Si no es director se obtienen solamente las reservas del usuario
      this.bookingService.getUserHistoryBookings(this.user._id).subscribe(res => {
        this.bookings = (res);
      }, error => console.log(error));
    }
  }

  getField(){
    this.fieldService.getSelectedField().subscribe(res => {
      this.field = res;
      this.getBookings();
    },error => console.log(error));
  }

  initTooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  }
}

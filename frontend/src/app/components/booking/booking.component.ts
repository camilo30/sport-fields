import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { User } from '../../models/user';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import {Field} from "../../models/field";
import {FieldService} from "../../services/field.service";


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

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
          this.bookingService.getFieldActiveBookings(this.field._id).subscribe(res => {
            this.bookings = (res);
          }, error => console.log(error));
        } else {
          // Si es director se obtienen todas las reservas
          this.bookingService.getActiveBookings().subscribe(res => {
            this.bookings = (res);
          }, error => console.log(error));
        }

      } else {
        // Si no es director se obtienen solamente las reservas del usuario
        this.bookingService.getUserActiveBookings(this.user._id).subscribe(res => {
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

  CancelBooking(_id){
    if (confirm("¿Está seguro de cancelar su reserva?")) {
      this.bookingService.cancelBooking(_id).subscribe(res => {
          M.toast({html: "Reserva cancelada", classes: 'red darken-2', displayLength: 3000});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        },
        error => console.log(error)
      );
    }
  }

  RejectBooking(id) {
    const body = {
      newStatus: 'R',
      subject: 'Reserva rechazada',
      booking: id,
      message: 'Su reserva ha sido rechazada.',
      additionalInfo: 'Por favor realizar la respectiva consignación y enviarla por este mismo medio, los detalles se pueden encontrar en la página web. Muchas gracias.'
    }

    const comm = prompt("Ingrese el motivo del rechazo:", "Uso institucional");
    if (comm){
      this.bookingService.rejectBooking(id, comm).subscribe(res => {
        M.toast({html: "Reserva rechazada: " + comm});
      });
      this.authService.sendMail(body).subscribe(res => {
        console.log(res);
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);


    }
  }



  ApproveBooking(id) {

    const body = {
      newStatus: 'A',
        subject: 'Reserva aprobada',
        booking: id,
        message: 'Su reserva ha sido aprobada.',
        additionalInfo: 'Por favor realizar la respectiva consignación y enviarla por este mismo medio, los detalles se pueden encontrar en la página web. Muchas gracias.'
    }


    if (confirm('¿Está seguro de aprobar la reserva?')){
      this.bookingService.approveBooking(id).subscribe(res => {
        M.toast({html: res});
        this.authService.sendMail(body).subscribe(res => {
          console.log(res);
        });
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      });
    }
  }


}

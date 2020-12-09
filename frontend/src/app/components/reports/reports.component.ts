import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { FieldService } from '../../services/field.service';
import { BookingService } from '../../services/booking.service';
import * as M from '../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  byStatus: any;
  byUser: any;
  byType: any;
  byField: any;
  hByField: any;

  constructor(
    private reportsService: ReportsService,
    private fieldService: FieldService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
  }

  getReports(startD: HTMLInputElement, endD: HTMLInputElement){

    if (startD.value && endD.value){
      const start = new Date(startD.value);
      const end = new Date(endD.value);

      if (start.getDate() < end.getDate()){
        this.getByStatus(start, end);
        this.getByType(start, end);
        this.getByUser(start, end);
        this.getByField(start, end);
        this.getHoursByField(start, end);
      } else {
        M.toast({html:'Por favor seleccione una fecha final mayor a la inicial'});
      }
    } else {
      M.toast({html:'Por favor seleccione Fecha inicial y Fecha final'});
    }
  }

  getByStatus(start, end){
    this.reportsService.getByStatus(start.toISOString(), end.toISOString()).subscribe(res => {
      console.log('status:', res);
      this.byStatus = res;
    }, error => console.log(error));
  }

  getByType(start, end){
    this.reportsService.getByType(start.toISOString(), end.toISOString()).subscribe(res => {
      console.log('type:', res);
      this.byType = res;
    }, error => console.log(error));
  }

  getByUser(start, end){
    this.reportsService.getByUser(start.toISOString(), end.toISOString()).subscribe(res => {
      console.log('user:', res);
      this.byUser = res;
    }, error => console.log(error));
  }

  getByField(start, end){
    this.reportsService.getBookingsByField(start.toISOString(), end.toISOString()).subscribe(res => {
      console.log('field:', res);
      this.byField = res;
    }, error => console.log(error));
  }

  getHoursByField(start, end){
    this.reportsService.getHoursByField(start.toISOString(), end.toISOString()).subscribe(res => {
      console.log('hours:', res);
      this.hByField = res;
    }, error => console.log(error));
  }

  initPickers(){
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);

  }


}

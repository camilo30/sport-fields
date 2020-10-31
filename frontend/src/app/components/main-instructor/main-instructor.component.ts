import { Component, OnInit } from '@angular/core';
import { FieldService } from '../../services/field.service';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { TypesOfService } from '../../services/types-of.service';
import { User } from '../../models/user';
import { Booking } from '../../models/booking';
import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import 'nouislider/distribute/nouislider.css';
import {Field} from '../../models/field';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import {delay} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-main-instructor',
  templateUrl: './main-instructor.component.html',
  styleUrls: ['./main-instructor.component.css']
})
export class MainInstructorComponent implements OnInit {
  user: User;
  fields: Field[];
  field: Field;
  datos: FormGroup;
  hrefs = ['one', 'two', 'three', 'four', 'five'];
  options: {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private bookingService: BookingService,
    private typeOfService: TypesOfService,
    private fieldService: FieldService
  ) {
    this.fields = [];
    this.datos = this.formBuilder.group({
      field1: ['']
    }, {updateOn: 'change'});

    this.datos.valueChanges.subscribe( res => {
      // console.log(this.datos.get('field1').value);
      const f = this.fieldService.getField(this.datos.get('field1').value).subscribe(res => {
        this.fieldService.setSelectedField(res);
        // Obtener escenario actual
        this.fieldService.getSelectedField().subscribe(res => {
          this.field = res;
        });
      });
    });

  }


  ngOnInit(): void {
    this.getUser();
    this.getFields();
  }

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.parallax');
    let instances = M.Parallax.init(elems);

    var elems2 = document.querySelectorAll('.datepicker');
    var instances2 = M.Datepicker.init(elems2);


  }

  getUser(){

    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.authService.setSelectedUser(res);
    });

    this.authService.selectedUser$.subscribe(res => {
      this.user = res;
    });
  }

  getFields(){
    this.fieldService.getFields().subscribe(res => {
      this.fields = res;
    });
  }

  loadTabs(){
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  }


}


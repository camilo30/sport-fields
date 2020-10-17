import {Component, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { FieldService } from '../../services/field.service';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { TypesOfService } from '../../services/types-of.service';
import { User } from '../../models/user';
import { Booking } from '../../models/booking';
import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import 'nouislider/distribute/nouislider.css';
import {Field} from '../../models/field';
declare var M: any;




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterViewInit{
  user: User;
  fields: Field[];
  datos: FormGroup;

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
        // console.log(res);
      });
    });

  }

  ngOnInit(): void {
    this.getUser();
    this.getFields();

  }

 ngAfterViewInit() {
   document.addEventListener('DOMContentLoaded', function() {
     var elems = document.querySelectorAll('.parallax');
     var instances = M.Parallax.init(elems);

   });

 }

  getUser(){

    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.authService.setSelectedUser(res);
    });

    this.authService.selectedUser$.subscribe(res => {
      console.log('user: ', res);
      this.user = res;
    });
  }

  getFields(){
    this.fieldService.getFields().subscribe(res => {
      this.fields = res;
    });
  }


}


import { Component, OnInit } from '@angular/core';
import {Field} from '../../models/field';
import {SchedulesService} from '../../services/schedules.service';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BookingService} from '../../services/booking.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';;
import {FieldService} from '../../services/field.service';
import {Router} from "@angular/router";



@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {
  datos: FormGroup;
  date: string;
  field: Field;
  user: User;
  schedules: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private fieldService: FieldService,
    private scheduleService: SchedulesService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.construirFormulario();
    this.getData()


  }

  ngOnInit(): void {
    this.getData();


  }

  getData(){
    // Obtener usuario
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.user = res;
      // Obtener escenario actual
      this.fieldService.getSelectedField().subscribe(res => {
        this.field = res;
      });
    });
  }

  construirFormulario(){
    this.datos = this.formBuilder.group({
      schedule: new FormArray([]),
      user: [''],
      desc: [''],
      bkgType: [''],
      frequest: [''],
      fattendant: [''],
    }, {updateOn: 'change'});
  }

  load(date: HTMLInputElement){
    this.date = date.value;
    const b = new Date (date.value);
    const fd = b.toISOString().split('T')[0];
    if (this.field){
      this.scheduleService.getDayFieldSchedules(this.field._id, fd).subscribe( res => {
        this.schedules = res;

      }, error => console.log(error));
    }else{
      M.toast({html: 'Por favor seleccione un escenario'});
    }
  }

  onCheckChange (event){
    const formArray: FormArray = this.datos.get('schedule') as FormArray;

    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onFileChange(event){
    console.log(event.target.files)
    if (event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.datos.patchValue({ frequest: file });
    }
  }

  onFileChange2(event){
    console.log(event.target.files)
    if (event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.datos.patchValue({ fattendant: file });
    }
  }


  DoBooking(){

    this.datos.patchValue({user: this.user.email});
    if (this.user.userType.internal){
      if (this.user.role.name === 'instructor'){
        this.datos.patchValue({bkgType: 'E'});

      }else if (this.user.role.name === 'user'){
        this.datos.patchValue({bkgType: 'P'});
      }
    }else{
      this.datos.patchValue({bkgType: 'A'});
    }

    console.log(this.datos.value)
    this.bookingService.createBooking(this.datos.value).subscribe( res => {
      M.toast({html: res});
      if (res === 'Reserva solicitada'){
        setTimeout(function () {
        window.location.reload();
      }, 1500);
      }




    }, error => console.log(error));

  }

  clean(){
    this.datos = null;
  }

  initTM(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);

    var elems1 = document.querySelectorAll('.modal');
    var instances1 = M.Modal.init(elems1);
  }

}

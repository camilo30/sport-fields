import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TypesOfService } from '../../services/types-of.service';
import { Router } from '@angular/router';
import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
declare var M: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  datos: FormGroup;

  userTypes: {code: '', desc: ''};
  dniTypes = {code: '', desc: ''};
  user = {
    userType: '',
    name: '',
    dniType: '',
    dni: '',
    code: '',
    phone: '',
    email: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private typeOfService: TypesOfService
  ) {


    /**
     //Ver cambios en consola
     this.datos.valueChanges.subscribe( res => {
      console.log(res);
    });
     */
  }



  crearFormulario(){
    this.datos  = this.formBuilder.group({
      name: ['', Validators.required],
      dniType: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      email: [this.user.email, Validators.required],
      userType: [''],
      code: [''],
      roles: [''], //para añadir admin
      password:[''] //para añadir admin
    }, {updateOn: 'change'});
  }

  ngOnInit(): void {

    this.authService.getCurrentEmail().subscribe(res => {
      this.user.email = res;
      this.crearFormulario();
    }, error => console.log(error));

    this.typeOfService.getInternalUserTypes().subscribe(res => {
      this.userTypes = res;
    }, error => console.log(error) );

    this.typeOfService.getDniTypes().subscribe(res => {
      this.dniTypes = res;
    }, error => console.log(error));
  }

  signUp(){

    /**
     //Agrega los roles en segundo plano
     this.datos.patchValue({roles:['admin','user']});
     this.datos.patchValue({password:'admin'});*/
    console.log(this.datos.value);

    this.authService.signUp(this.datos.value)
      .subscribe(
        res => {
          console.log(res);
          M.toast({html: 'Usuario registrado con èxito', classes: 'green darken-2'});
          this.router.navigate(['/signin']);
        },
        err => console.log(err)
      )


  }


}

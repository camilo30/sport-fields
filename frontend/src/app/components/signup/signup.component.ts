import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TypesOfService } from '../../services/types-of.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import {ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DniType, Role, UserType} from '../../models/types';
declare var M: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  datos: FormGroup;
  userTypes: UserType;
  dniTypes: DniType;
  roles: Role;
  loggedUser: User;
  user = {
    name: '',
    dniType: '',
    dni: '',
    phone: '',
    email: '',
    userType: '',
    code: '',
    role: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private typeOfService: TypesOfService
  ) {
  }

  ngOnInit(): void {

    this.getUser();

    this.authService.getCurrentEmail().subscribe(res => {
      this.user.email = res;
      this.crearFormulario();
    }, error => console.log(error));

    this.getTypes();


  }

  getUser(){
    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.authService.setSelectedUser(res);

    });

    this.authService.selectedUser$.subscribe(res => {
      this.loggedUser = res;
      this.getTypes();
    });
  }

  getTypes(){
    if (this.loggedUser){
      this.typeOfService.getUserTypes().subscribe(res => {
        this.userTypes = res;
      }, error => console.log(error) );
      this.typeOfService.getDniTypes().subscribe(res => {
        this.dniTypes = res;
      }, error => console.log(error));
      this.typeOfService.getRoles().subscribe(res => {
        this.roles = res;
      }, error => console.log(error));
    }else {
      this.typeOfService.getInternalUserTypes().subscribe(res => {
        this.userTypes = res;
      }, error => console.log(error) );
      this.typeOfService.getDniTypes().subscribe(res => {
        this.dniTypes = res;
      }, error => console.log(error));
    }
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
      role: [''], //para añadir director
      password: [''] //para añadir director
    }, {updateOn: 'change'});
  }

  signUp(){
    this.authService.signUp(this.datos.value)
      .subscribe(
        res => {
          M.toast({html: 'Usuario registrado con éxito', classes: 'green darken-2'});
          if (this.loggedUser){
            this.router.navigate(['/mainA']);
          }else{
            this.router.navigate(['/signin']);
          }

        },err => console.log(err) );
  }

}

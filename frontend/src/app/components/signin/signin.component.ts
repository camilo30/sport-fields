import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import {ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as M from '../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  datos: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      localStorage.removeItem('token');
    }
    this.crearFormulario();
  }

  crearFormulario(){
    this.datos = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }, {updateOn: 'change'});
  }

  getUser(){
    /*  const roles = this.authService.getUser(this.user.email)
        .subscribe(res => console.log(res));
  */
  }

  signIn(){
    this.authService.signIn(this.datos.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.user = res.userFound;
            if (this.user.role.name === 'admin'){
              this.router.navigate(['/mainA']);
            } else if (this.user.role.name === 'director'){
              this.router.navigate(['/mainD']);
            } else {
              this.router.navigate(['/mainI']);
            }
        },err => {
          M.toast({html: err.error.message});
        }
      );
  }
}

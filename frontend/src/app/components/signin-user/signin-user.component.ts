import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as M from '../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {

  user = {email: ''};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      localStorage.removeItem('token');
    }
  }

  getUser(){
    const roles = this.authService.signInUser(this.user)
      .subscribe(res => {
          M.toast({html: res.message });
          if (res.message === 'Ingreso satisfactorio'){
            localStorage.setItem('token', res.token);
            this.router.navigate(['main']);
          }
        },
        error => {
          M.toast({html:'Usuario no existe', classes: "yellow darken-2"});
          this.authService.setCurrentEmail(this.user.email);
          this.router.navigate(['/signup']);
        });
  }

}

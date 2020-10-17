import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {

  user = {
    userType: '',
    name: '',
    dniType: '',
    dni: '',
    code: '',
    phone: '',
    email: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getUser(){
    const roles = this.authService.signInUser(this.user)
      .subscribe(res => {
          localStorage.setItem('token', res.token);
          M.toast({html:'Ingreso satisfactorio', classes: "green darken-2"});
          this.router.navigate(['main']);
        },
        error => {
          M.toast({html:'Usuario no existe', classes: "yellow darken-2"});
          this.authService.setCurrentEmail(this.user.email);

          this.router.navigate(['/signup']);
        });
  }

}

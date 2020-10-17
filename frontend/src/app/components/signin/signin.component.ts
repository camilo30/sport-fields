import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getUser(){
    /*  const roles = this.authService.getUser(this.user.email)
        .subscribe(res => console.log(res));
  */
  }

  signIn(){
    this.authService.signIn(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/mainD']);
        },
        err => console.log(err)
      );
  }

}

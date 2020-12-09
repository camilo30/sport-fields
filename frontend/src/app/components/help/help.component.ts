import { Component, OnInit } from '@angular/core';

import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  user: User;
  constructor( private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){

    this.authService.getUser(localStorage.getItem('token')).subscribe(res => {
      this.authService.setSelectedUser(res);
    });

    this.authService.selectedUser$.subscribe(res => {
      this.user = res;
    });
  }

}

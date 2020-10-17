import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  selectedUser1: User;
  private selectUser = new BehaviorSubject<any>('');
  selectedUser$ = this.selectUser.asObservable();

  private currentEmail = new BehaviorSubject<any>('');

  readonly URL_API = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  signUp(user){
    return this.http.post<any>(this.URL_API + '/signup', user);
  }

  signInUser(email){
    return this.http.post<any>(this.URL_API + '/signin', email);
  }

  signIn(email){
    return this.http.post<any>(this.URL_API + '/signin', email);
  }

  getUser(token){
    return this.http.get<any>(this.URL_API + `/getUser/${token}`);
  }

  getUsers(){
    return this.http.get<any>(this.URL_API);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  setSelectedUser(user: any){
    this.selectUser.next(user);
  }

  getCurrentEmail(): Observable<any>{
    return this.currentEmail.asObservable();
  }

  setCurrentEmail(user: any){
    this.currentEmail.next(user);
  }
}

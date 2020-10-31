import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly URL_API = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  getBookings(){
    return this.http.get<any>(this.URL_API);
  }

  getCalendarBookings(){
    return this.http.get<any>(this.URL_API + `/calendar`);
  }

  getActiveBookings(){
    return this.http.get<any>(this.URL_API + `/active`);
  }

  getHistoryBookings(){
    return this.http.get<any>(this.URL_API + `/history`);
  }

  getUserBooking(userId){
    return this.http.get<any>(this.URL_API + `/user/${userId}`);
  }

  getUserActiveBookings(userId){
    return this.http.get<any>(this.URL_API + `/user/active/${userId}`);
  }

  getUserHistoryBookings(userId){
    return this.http.get<any>(this.URL_API + `/user/history/${userId}`);
  }

  getFieldBookings(fieldId){
    return this.http.get<any>(this.URL_API + `/field/${fieldId}`);
  }

  getFieldCalendarBookings(fieldId){
    return this.http.get<any>(this.URL_API + `/field/calendar/${fieldId}`);
  }

  getFieldActiveBookings(fieldId){
    return this.http.get<any>(this.URL_API + `/field/active/${fieldId}`);
  }

  getFieldHistoryBookings(fieldId){
    return this.http.get<any>(this.URL_API + `/field/history/${fieldId}`);
  }

  cancelBooking(id){
    return this.http.get<any>(this.URL_API + `/cancel/${id}`);
  }

  approveBooking(id){
    return this.http.get<any>(this.URL_API + `/approve/${id}`);
  }

  rejectBooking(id, comm){
    return this.http.get<any>(this.URL_API + `/reject/${id}/${comm}`);
  }

  createBooking(datos){
    const fd = new FormData();
    fd.append('user', datos.user);
    fd.append('desc', datos.desc);
    fd.append('bkgType', datos.bkgType);
    fd.append('frequest', datos.frequest);
    fd.append('fattendant', datos.fattendant);
    fd.append('schedule', datos.schedule);
    return this.http.post(this.URL_API, fd);
  }
}

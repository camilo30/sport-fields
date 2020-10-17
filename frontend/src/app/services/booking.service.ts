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
  getUserBooking(userId){
    return this.http.get<any>(this.URL_API + `/user/${userId}`);
  }

  getFieldBookings(fieldId){
    return this.http.get<any>(this.URL_API + `/field/${fieldId}`);
  }

  cancelBooking(id){
    return this.http.get<any>(this.URL_API + `/cancel/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  readonly URL_API = 'http://localhost:3000/api/schedules';

  constructor(private http: HttpClient) { }

  getFieldSchedules(fieldId){
    return this.http.get<any>(this.URL_API + `/field/${fieldId}`);
  }

  getBookedSchedules(){
    return this.http.get<any>(this.URL_API + `/booked`);
  }
}

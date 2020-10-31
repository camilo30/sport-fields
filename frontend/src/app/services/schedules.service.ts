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

  getDayFieldSchedules(fieldId, date){
    return this.http.get(this.URL_API + `/dayField/${fieldId}/${date}`);
  }

  getFieldFreeSchedules(fieldId){
    return this.http.get(this.URL_API + `/allField/${fieldId}`);
  }

  postSchedule(field: string, start: string, end: string){
    const a = { field: field, start: start, end: end};
    return this.http.post(this.URL_API, a);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  readonly URL_API = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) { }

  getByStatus(startD, endD){
    return this.http.get<any>(this.URL_API + `/status/${startD}/${endD}`);
  }

  getByType(startD, endD){
    return this.http.get<any>(this.URL_API + `/type/${startD}/${endD}`);
  }


  getByUser(startD, endD){
    return this.http.get<any>(this.URL_API + `/user/${startD}/${endD}`);
  }

  getBookingsByField(startD, endD){
    return this.http.get<any>(this.URL_API + `/field/${startD}/${endD}`);
  }

  getHoursByField(startD, endD){
    return this.http.get<any>(this.URL_API + `/hField/${startD}/${endD}`);
  }


}

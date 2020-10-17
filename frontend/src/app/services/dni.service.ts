import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dni } from "../models/dni";

@Injectable({
  providedIn: 'root'
})
export class DniService{

  selectedDni: Dni;
  dnis: Dni[];
  readonly URL_API = 'http://localhost:3000/api/dnis';

  constructor(private http: HttpClient) {
    this.selectedDni = new Dni();
  }

  getDnis(){
    return this.http.get(this.URL_API);
  }

  postDni(dni: Dni){
    return this.http.post(this.URL_API,dni);
  }

  putDni(dni: Dni){
    return this.http.put(this.URL_API + `/${dni._id}`, dni);
  }

  deleteDni(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }


}

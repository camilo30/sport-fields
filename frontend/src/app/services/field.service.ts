import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Field } from '../models/field'
import {BehaviorSubject, Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class FieldService {

  //selectedField: Field;
  private selectedField = new BehaviorSubject<any>('');
  fields: Field[];
  readonly URL_API = 'http://localhost:3000/api/fields';

  constructor(private http: HttpClient) {
    //this.selectedField = new Field();
  }

  getFields(){
    return this.http.get<Field[]>(this.URL_API +`/all`);
  }

  getField(id: string){
    return this.http.get<Field>(this.URL_API + `/field/${id}`);
  }

  getByName(name: string){
    return this.http.get(this.URL_API + `/nameSearch/${name}`);
  }

  getByColor(color: string){
    return this.http.get(this.URL_API + `/colorSearch/${color}` );
  }

  postField(name: string, desc: string, color: string, photo: File){
    const fd = new FormData();
    fd.append('name',name);
    fd.append('desc',desc);
    fd.append('color', color);
    fd.append('image',photo);
    return this.http.post(this.URL_API, fd);
  }

  deleteField(id: string){
    return this.http.delete(this.URL_API+ `/${id}`);

  }

  updateField(id: string, name: string, desc: string){
    return this.http.put(this.URL_API + `/${id}`, {name,desc} );

  }

  putField(field: Field){
    return this.http.put(this.URL_API+`/${field._id}`, field);
  }

  getSelectedField(): Observable<any>{
    return this.selectedField.asObservable();
  }

  setSelectedField(field: any){
    this.selectedField.next(field);
  }

}

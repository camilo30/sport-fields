import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypesOfService {

  readonly URL_API = 'http://localhost:3000/api/types';

  constructor(private http: HttpClient) { }

  getUserTypes(){
    return this.http.get<any>(this.URL_API+`/user`);
  }

  getInternalUserTypes(){
    return this.http.get<any>(this.URL_API+`/user/internal`);
  }

  getDniTypes(){
    return this.http.get<any>(this.URL_API+`/dni`);
  }

  getAtchTypes(){
    return this.http.get<any>(this.URL_API+`/atch`);
  }

  getBkgTypes(){
    return this.http.get<any>(this.URL_API+`/bkg`);
  }

  getBkgType(id){
    return this.http.get<any>(this.URL_API + `/bkg/${id}`);
  }

  getBkgStatus(){
    return this.http.get<any>(this.URL_API + `/bkgstatus`);
  }

  getRoles(){
    return this.http.get<any>(this.URL_API + `/roles`);
  }


}

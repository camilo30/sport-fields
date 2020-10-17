import { Component, OnInit } from '@angular/core';
import {TypesOfService} from "../../services/types-of.service";


@Component({
  selector: 'app-type-of',
  templateUrl: './type-of.component.html',
  styleUrls: ['./type-of.component.css']
})
export class TypeOfComponent implements OnInit {

  userTypes: any[];
  dniTypes: any[];
  atchTypes: any[];
  bkgTypes: any[];
  bkgStatus: any[];


  constructor(private typeOfService: TypesOfService ) {
    this.CargarInfo()
  }

  ngOnInit(): void {
  }

  CargarInfo(){

    this.typeOfService.getUserTypes().subscribe(
      res=> {
        //console.log('usuarios',res);
        this.userTypes=res;
      }
    );

    this.typeOfService.getDniTypes().subscribe(
      res=> {
        //console.log('dni',res);
        this.dniTypes=res;
      }
    );

    this.typeOfService.getAtchTypes().subscribe(
      res=> {
        //console.log('dni',res);
        this.atchTypes=res;
      }
    );

    this.typeOfService.getBkgTypes().subscribe(
      res=> {
        //console.log('dni',res);
        this.bkgTypes=res;
      }
    );

    this.typeOfService.getBkgStatus().subscribe(
      res=> {
        //console.log('dni',res);
        this.bkgStatus=res;
      }
    );



  }



}

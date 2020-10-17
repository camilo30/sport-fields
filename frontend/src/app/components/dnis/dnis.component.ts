import { Component, OnInit } from '@angular/core';
import { DniService } from '../../services/dni.service';
import { NgForm } from "@angular/forms";
import { Dni } from "../../models/dni";

declare var M: any;

@Component({
  selector: 'app-dnis',
  templateUrl: './dnis.component.html',
  styleUrls: ['./dnis.component.css'],
  providers: [DniService]
})
export class DnisComponent implements OnInit {

  constructor(private dniService: DniService) {

  }

  getDniService(){
    return this.dniService;
  }

  ngOnInit(): void {
    this.getDnis();
  }

  addDni(form: NgForm){
    if (form.value._id){
      this.dniService.putDni(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Tipo de identificación Actualizada'});
          this.getDnis();
        });
    }else{
      this.dniService.postDni(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Tipo de identificación Guardada'});
          this.getDnis();
        });
    }
  }

  getDnis(){
    this.dniService.getDnis()
      .subscribe(res => {
        this.dniService.dnis= res as Dni[];
        console.log(res);
      });
  }

  editDni(dni: Dni){
    this.dniService.selectedDni = dni;
  }

  deleteDni(_id: string){
    if (confirm('¿Está seguro de eliminarlo?')) {
      this.dniService.deleteDni(_id)
        .subscribe(res => {
          M.toast({html: 'Tipo de identificación eliminada'});
          this.getDnis();
        });
    }
  }
  resetForm(form?: NgForm){
    if (form) {
     form.reset();
     this.dniService.selectedDni = new Dni();
    }
  }



}

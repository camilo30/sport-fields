import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../../services/schedules.service';
import {FieldService} from '../../services/field.service';
import { Schedule } from '../../models/Schedule';
import {Field} from '../../models/field';
import * as M from '../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  field: Field;
  date = new Date();



  constructor(
    private scheduleService: SchedulesService,
    private fieldService: FieldService

  ) { }

  ngOnInit(): void {
    this.getfield();

  }

  getfield(){
    this.fieldService.getSelectedField().subscribe(res => {
      this.field = res;
    });

  }

  generarHorarios(startD: HTMLInputElement, endD: HTMLInputElement, startT: HTMLInputElement, endT: HTMLInputElement){
    let dates = [];
    let start, end: any;
    const a = new Date(startD.value + ' ' + startT.value);
    const b = new Date(endD.value + ' ' + endT.value);

    if (this.field){
      if (a.getHours() !== b.getHours() && a.getHours() < b.getHours()){
        for (let i = a.getDate(); i <= b.getDate(); i++){
          for (let j = a.getHours(); j <= (b.getHours() - 1 ); j += 1 ){
            start = new Date(a.setDate(i));
            end = new Date(start.setHours(j) + ( 1000 * 60 * 60) );
            console.log(this.field.name, start.toISOString(), end.toISOString());
            this.scheduleService.postSchedule(this.field.name, start, end).subscribe( res => {
              console.log(res);
            }, error => {} );
          }
        }
        M.toast({html: 'Horarios generados para el escenario: ' + this.field.name });
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }else{
        M.toast({html: 'Por favor seleccione una hora final mayor a la inicial'});
      }
    }else{
      M.toast({html: 'Por favor seleccione un escenario'});
    }
  }

}

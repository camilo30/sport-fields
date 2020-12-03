import { Component, OnInit} from '@angular/core';
import { FieldService } from '../../services/field.service';
import { SchedulesService } from '../../services/schedules.service';
import { Field } from '../../models/field';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import {Schedule} from "../../models/Schedule";
import {split} from "ts-node";

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  fields = [];
  file: File;
  schedules: any;
  photoSelected: string | ArrayBuffer;


  constructor(
    private fieldService: FieldService,
    private scheduleService: SchedulesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFiedls();
  }


  getFiedls(): void{
    this.fieldService.getFields()
      .subscribe(
        res => {
          this.fields = res;
        },
        err => console.log(err));
  }


  addField(name: HTMLInputElement, desc: HTMLTextAreaElement, color: HTMLSelectElement): void{
    if (name.value){
      if (desc.value){
        if (color.value !== 'option'){
          if (this.file){
            this.fieldService.getByName(name.value).subscribe(res => {
              const bn = Object.keys(res);
              if (bn.length > 0){
                M.toast({html: 'El nombre del escenario ya existe'});
              } else {
                const col = color.value.split('#')[1];
                this.fieldService.getByColor(col).subscribe(res => {
                  const bc = Object.keys(res);
                  if (bc.length > 0) {
                    if (confirm("El color ya es utilizado en otro escenario ¿Agregar el escenario de todos modos?")) {
                      this.fieldService.postField(name.value, desc.value, color.value, this.file).subscribe(res => {
                        name.value = '';
                        desc.value = '';
                        color.selectedIndex = 0;
                        this.file = null;
                        M.toast({html: 'Escenario creado'});
                        setTimeout(function () {
                          window.location.reload();
                        }, 1500);
                      }, err => console.log(err));
                    }
                  } else {
                    this.fieldService.postField(name.value, desc.value, color.value, this.file).subscribe(res => {
                      name.value = '';
                      desc.value = '';
                      color.selectedIndex = 0;
                      this.file = null;
                      M.toast({html: 'Escenario creado'});

                      setTimeout(function () {
                        window.location.reload();
                      }, 1500);
                    }, err => console.log(err));
                  }
                });
              }
            });
          } else {
            M.toast({html: 'Por favor seleccione una imagen para el escenario'});
          }
        } else {
          M.toast({html: 'Por favor seleccione un color para el escenario'});
        }
      } else {
        M.toast({html: 'Por favor digite la descripción del escenario'});
      }
    } else {
      M.toast({html: 'Por favor digite el nombre del escenario'});
    }
  }

  initSelect(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }

  deleteField(id: string): void{
    if (confirm("¿Está seguro de eliminar el escenario?")) {
      this.scheduleService.getFieldFreeSchedules(id).subscribe(res => {
        this.schedules = res;
        if (this.schedules.length > 0) {
          M.toast({html: 'No se puede eliminar el escenario, tiene horarios asignados.'});
        } else {
            this.fieldService.deleteField(id).subscribe(res => {
                console.log(res);
                M.toast({html: 'Escenario eliminado'});
                setTimeout(function () {
                  window.location.reload();
                }, 1500);
              },
              err => console.log(err)
            );
        }
      });
    }


  }

  onPhotoSelected(event: HtmlInputEvent): void{
   if (event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      //image preview
     const reader = new FileReader();
     reader.onload = e => this.photoSelected = reader.result;
     reader.readAsDataURL(this.file);
   }
  }

  selectedCard(id: string){
    this.router.navigate(['/fields', id]);
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}

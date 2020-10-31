import { Component, OnInit} from '@angular/core';
import { FieldService } from '../../services/field.service';
import { SchedulesService } from '../../services/schedules.service';
import { Field } from '../../models/field';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import {Schedule} from "../../models/Schedule";

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


  addField(name: HTMLInputElement, desc: HTMLInputElement, color: HTMLSelectElement): void{
    this.fieldService.postField(name.value, desc.value, color.value, this.file).subscribe(res => {
      name.value = '';
      desc.value = '';
      color.selectedIndex = 0;
      this.file = null;
      M.toast({html: 'Escenario creado'});
      window.location.reload();


    }, err => console.log(err));


  }



  deleteField(id: string): void{
    this.scheduleService.getFieldFreeSchedules(id).subscribe(res => {
      this.schedules = res;
      if (this.schedules.length > 0){
      M.toast({html: 'No se puede eliminar el escenario, tiene horarios asignados.'});
      } else {

        if (confirm('Está seguro de eliminar el escenario?')){
          console.log('el id: ',id)
          this.fieldService.deleteField(id).subscribe(res => {
                console.log(res);
                M.toast({html: 'Escenario eliminado'});
                this.ngOnInit();
                window.location.reload();
              },
              err => console.log(err)
            );
        }
      }
    });


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

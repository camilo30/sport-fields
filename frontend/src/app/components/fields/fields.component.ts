import { Component, OnInit, OnChanges } from '@angular/core';
import { FieldService } from '../../services/field.service'
import { Field } from '../../models/field';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

declare var M: any;

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit, OnChanges {

  fields = [];
  file: File;
  photoSelected: string | ArrayBuffer;


  constructor(private fieldService: FieldService, private sanitizer:DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.getFiedls();


    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.modal');
      const instances = M.Modal.init(elems );
    });
  }

  OnChanges(){

  }

  getFiedls(){
    this.fieldService.getFields()
      .subscribe(
        res => {
          this.fields = res;
        },
        err => console.log(err));
  }

    //metodos 1

  addField(name: HTMLInputElement, desc: HTMLInputElement){
     this.fieldService.postField(name.value, desc.value, this.file)
       .subscribe(res => console.log(res), err => console.log(err));
     M.toast({html: 'Escenario creado'});
     this.getFiedls();
     console.log(this.fields);
  }

  deleteField(id: string){
    if(confirm("Está seguro de eliminar el escenario?")){
      this.fieldService.deleteField(id)
        .subscribe(
          res => {
            console.log(res);
            M.toast({html: "Escenario eliminado"})
            this.ngOnInit();
          },
          err => console.log(err)
        )
    }

  }

  onPhotoSelected(event: HtmlInputEvent){
   if(event.target.files && event.target.files[0]){
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

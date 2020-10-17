import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router'
import {FieldService} from "../../services/field.service";
import {Field} from "../../models/field";

declare var M: any;

@Component({
  selector: 'app-field-preview',
  templateUrl: './field-preview.component.html',
  styleUrls: ['./field-preview.component.css']
})
export class FieldPreviewComponent implements OnInit {

  id: string;
  field: Field;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private fieldService: FieldService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(params => {
      console.log(params)
      this.id = params.id,
      this.fieldService.getField(this.id)
        .subscribe(
          res => {
            this.field = res;
          },
            err => console.log(err)
        )
    })
  }


  deleteField(id: string){
    if(confirm("Está seguro de eliminar el escenario?")){
      this.fieldService.deleteField(id)
        .subscribe(
          res => {
            console.log(res);
            M.toast({html: "Escenario eliminado"})
            this.router.navigate(['/fields'])
          },
          err => console.log(err)
        )
    }

  }


  updateField(name: HTMLInputElement, desc: HTMLTextAreaElement, ){
    this.fieldService.updateField(this.id, name.value, desc.value)
      .subscribe(res => {
          M.toast({html: "Escenario actualizado"})
          this.router.navigate(['/fields'])
        },err => console.log(err)
      )

  }

}

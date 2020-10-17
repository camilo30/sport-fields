import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfComponent } from './type-of.component';

describe('TypeOfComponent', () => {
  let component: TypeOfComponent;
  let fixture: ComponentFixture<TypeOfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

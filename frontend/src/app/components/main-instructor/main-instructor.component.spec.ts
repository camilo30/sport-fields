import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInstructorComponent } from './main-instructor.component';

describe('MainInstructorComponent', () => {
  let component: MainInstructorComponent;
  let fixture: ComponentFixture<MainInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

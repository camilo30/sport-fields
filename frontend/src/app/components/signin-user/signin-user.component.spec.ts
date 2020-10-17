import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninUserComponent } from './signin-user.component';

describe('SigninUserComponent', () => {
  let component: SigninUserComponent;
  let fixture: ComponentFixture<SigninUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

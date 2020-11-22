import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignInButtonComponent } from './sign-in-button.component';

describe('SignInButtonComponent', () => {
  let component: SignInButtonComponent;
  let fixture: ComponentFixture<SignInButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

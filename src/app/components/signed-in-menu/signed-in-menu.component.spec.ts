import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignedInMenuComponent } from './signed-in-menu.component';

describe('SignedInMenuComponent', () => {
  let component: SignedInMenuComponent;
  let fixture: ComponentFixture<SignedInMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedInMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedInMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

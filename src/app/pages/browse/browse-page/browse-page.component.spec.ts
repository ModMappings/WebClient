import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowsePageComponent } from './browse-page.component';

describe('BrowsePageComponent', () => {
  let component: BrowsePageComponent;
  let fixture: ComponentFixture<BrowsePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

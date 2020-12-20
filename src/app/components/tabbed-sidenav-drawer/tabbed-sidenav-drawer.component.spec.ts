import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedSidenavDrawerComponent } from './tabbed-sidenav-drawer.component';

describe('TabbedSidenavDrawerComponent', () => {
  let component: TabbedSidenavDrawerComponent;
  let fixture: ComponentFixture<TabbedSidenavDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbedSidenavDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedSidenavDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

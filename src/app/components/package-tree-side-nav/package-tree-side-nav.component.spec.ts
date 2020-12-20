import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTreeSideNavComponent } from './package-tree-side-nav.component';

describe('PackageTreeSideNavComponent', () => {
  let component: PackageTreeSideNavComponent;
  let fixture: ComponentFixture<PackageTreeSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageTreeSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageTreeSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

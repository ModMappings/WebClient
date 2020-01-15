import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTreeComponent } from './package-tree.component';

describe('PackageTreeComponent', () => {
  let component: PackageTreeComponent;
  let fixture: ComponentFixture<PackageTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

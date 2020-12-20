import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSelectorSideNavComponent } from './class-selector-side-nav.component';

describe('ClassSelectorSideNavComponent', () => {
  let component: ClassSelectorSideNavComponent;
  let fixture: ComponentFixture<ClassSelectorSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSelectorSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSelectorSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingFiltersSelectorComponent } from './mapping-filters-selector.component';

describe('MappingFiltersSelectorComponent', () => {
  let component: MappingFiltersSelectorComponent;
  let fixture: ComponentFixture<MappingFiltersSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingFiltersSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingFiltersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

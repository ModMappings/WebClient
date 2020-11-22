import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MappingDetailViewComponent } from './mapping-detail-view.component';

describe('MappingDetailViewComponent', () => {
  let component: MappingDetailViewComponent;
  let fixture: ComponentFixture<MappingDetailViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAssignmentMarksComponent } from './report-assignment-marks.component';

describe('ReportAssignmentMarksComponent', () => {
  let component: ReportAssignmentMarksComponent;
  let fixture: ComponentFixture<ReportAssignmentMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAssignmentMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAssignmentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

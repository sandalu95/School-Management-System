import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStudentProgressComponent } from './report-student-progress.component';

describe('ReportStudentProgressComponent', () => {
  let component: ReportStudentProgressComponent;
  let fixture: ComponentFixture<ReportStudentProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

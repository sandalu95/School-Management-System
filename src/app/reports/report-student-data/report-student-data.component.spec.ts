import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStudentDataComponent } from './report-student-data.component';

describe('ReportStudentDataComponent', () => {
  let component: ReportStudentDataComponent;
  let fixture: ComponentFixture<ReportStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

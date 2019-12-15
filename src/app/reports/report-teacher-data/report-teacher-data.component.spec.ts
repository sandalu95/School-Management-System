import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTeacherDataComponent } from './report-teacher-data.component';

describe('ReportTeacherDataComponent', () => {
  let component: ReportTeacherDataComponent;
  let fixture: ComponentFixture<ReportTeacherDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTeacherDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTeacherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

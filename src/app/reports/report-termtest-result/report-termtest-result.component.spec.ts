import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTermtestResultComponent } from './report-termtest-result.component';

describe('ReportTermtestResultComponent', () => {
  let component: ReportTermtestResultComponent;
  let fixture: ComponentFixture<ReportTermtestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTermtestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTermtestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

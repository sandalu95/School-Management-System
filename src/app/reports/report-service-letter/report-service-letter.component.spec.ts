import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportServiceLetterComponent } from './report-service-letter.component';

describe('ReportServiceLetterComponent', () => {
  let component: ReportServiceLetterComponent;
  let fixture: ComponentFixture<ReportServiceLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportServiceLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportServiceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

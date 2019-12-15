import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportContactInfoComponent } from './report-contact-info.component';

describe('ReportContactInfoComponent', () => {
  let component: ReportContactInfoComponent;
  let fixture: ComponentFixture<ReportContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

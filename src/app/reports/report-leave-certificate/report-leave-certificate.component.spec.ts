import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeaveCertificateComponent } from './report-leave-certificate.component';

describe('ReportLeaveCertificateComponent', () => {
  let component: ReportLeaveCertificateComponent;
  let fixture: ComponentFixture<ReportLeaveCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLeaveCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLeaveCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

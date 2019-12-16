import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCharacterCertificateComponent } from './report-character-certificate.component';

describe('ReportCharacterCertificateComponent', () => {
  let component: ReportCharacterCertificateComponent;
  let fixture: ComponentFixture<ReportCharacterCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCharacterCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCharacterCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

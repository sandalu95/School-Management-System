import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClerkDataComponent } from './report-clerk-data.component';

describe('ReportClerkDataComponent', () => {
  let component: ReportClerkDataComponent;
  let fixture: ComponentFixture<ReportClerkDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportClerkDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportClerkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

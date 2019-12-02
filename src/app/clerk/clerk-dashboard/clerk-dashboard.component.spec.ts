import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkDashboardComponent } from './clerk-dashboard.component';

describe('ClerkDashboardComponent', () => {
  let component: ClerkDashboardComponent;
  let fixture: ComponentFixture<ClerkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClerkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

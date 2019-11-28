import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkSalaryComponent } from './clerk-salary.component';

describe('ClerkSalaryComponent', () => {
  let component: ClerkSalaryComponent;
  let fixture: ComponentFixture<ClerkSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClerkSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

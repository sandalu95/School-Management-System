import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSalaryComponent } from './teacher-salary.component';

describe('TeacherSalaryComponent', () => {
  let component: TeacherSalaryComponent;
  let fixture: ComponentFixture<TeacherSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

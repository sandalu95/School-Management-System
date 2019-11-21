import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddStudentsComponent } from './teacher-add-students.component';

describe('TeacherAddStudentsComponent', () => {
  let component: TeacherAddStudentsComponent;
  let fixture: ComponentFixture<TeacherAddStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAddStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditStudentsComponent } from './teacher-edit-students.component';

describe('TeacherEditStudentsComponent', () => {
  let component: TeacherEditStudentsComponent;
  let fixture: ComponentFixture<TeacherEditStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEditStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEditStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewStudentsComponent } from './teacher-view-students.component';

describe('TeacherViewStudentsComponent', () => {
  let component: TeacherViewStudentsComponent;
  let fixture: ComponentFixture<TeacherViewStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherViewStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

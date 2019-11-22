import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMarksComponent } from './teacher-marks.component';

describe('TeacherMarksComponent', () => {
  let component: TeacherMarksComponent;
  let fixture: ComponentFixture<TeacherMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

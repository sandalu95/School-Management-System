import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddParentsComponent } from './teacher-add-parents.component';

describe('TeacherAddParentsComponent', () => {
  let component: TeacherAddParentsComponent;
  let fixture: ComponentFixture<TeacherAddParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAddParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

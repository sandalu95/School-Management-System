import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherParentsComponent } from './teacher-parents.component';

describe('TeacherParentsComponent', () => {
  let component: TeacherParentsComponent;
  let fixture: ComponentFixture<TeacherParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewParentsComponent } from './teacher-view-parents.component';

describe('TeacherViewParentsComponent', () => {
  let component: TeacherViewParentsComponent;
  let fixture: ComponentFixture<TeacherViewParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherViewParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditParentsComponent } from './teacher-edit-parents.component';

describe('TeacherEditParentsComponent', () => {
  let component: TeacherEditParentsComponent;
  let fixture: ComponentFixture<TeacherEditParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEditParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEditParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

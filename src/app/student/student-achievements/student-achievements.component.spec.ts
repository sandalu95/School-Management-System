import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAchievementsComponent } from './student-achievements.component';

describe('StudentAchievementsComponent', () => {
  let component: StudentAchievementsComponent;
  let fixture: ComponentFixture<StudentAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

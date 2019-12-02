import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkAchievementsComponent } from './clerk-achievements.component';

describe('ClerkAchievementsComponent', () => {
  let component: ClerkAchievementsComponent;
  let fixture: ComponentFixture<ClerkAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClerkAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

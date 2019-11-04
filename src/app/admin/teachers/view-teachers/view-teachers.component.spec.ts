import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeachersComponent } from './view-teachers.component';

describe('ViewTeachersComponent', () => {
  let component: ViewTeachersComponent;
  let fixture: ComponentFixture<ViewTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMarksComponent } from './parent-marks.component';

describe('ParentMarksComponent', () => {
  let component: ParentMarksComponent;
  let fixture: ComponentFixture<ParentMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClerksComponent } from './view-clerks.component';

describe('ViewClerksComponent', () => {
  let component: ViewClerksComponent;
  let fixture: ComponentFixture<ViewClerksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClerksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClerksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

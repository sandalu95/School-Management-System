import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClerksComponent } from './edit-clerks.component';

describe('EditClerksComponent', () => {
  let component: EditClerksComponent;
  let fixture: ComponentFixture<EditClerksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClerksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClerksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

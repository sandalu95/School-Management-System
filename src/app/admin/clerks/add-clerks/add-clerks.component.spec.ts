import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClerksComponent } from './add-clerks.component';

describe('AddClerksComponent', () => {
  let component: AddClerksComponent;
  let fixture: ComponentFixture<AddClerksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClerksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClerksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachersComponent } from './edit-teachers.component';

describe('EditTeachersComponent', () => {
  let component: EditTeachersComponent;
  let fixture: ComponentFixture<EditTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

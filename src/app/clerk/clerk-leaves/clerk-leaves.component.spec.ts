import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkLeavesComponent } from './clerk-leaves.component';

describe('ClerkLeavesComponent', () => {
  let component: ClerkLeavesComponent;
  let fixture: ComponentFixture<ClerkLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClerkLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

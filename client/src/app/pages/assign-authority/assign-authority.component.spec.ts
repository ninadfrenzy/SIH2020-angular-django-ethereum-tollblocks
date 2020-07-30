import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAuthorityComponent } from './assign-authority.component';

describe('AssignAuthorityComponent', () => {
  let component: AssignAuthorityComponent;
  let fixture: ComponentFixture<AssignAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
